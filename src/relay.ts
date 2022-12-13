import { Args } from "grimoire-kolmafia";
import { write } from "kolmafia";
import {
  ComponentHtml,
  ComponentSetting,
  generateHTML,
  handleApiRequest,
  RelayPage,
} from "mafia-shared-relay";
import { args } from "./args";
import { checkReqs } from "./tasks/sim";

function convertArgsToHtml(): RelayPage[] {
  const metadata = Args.getMetadata(args);
  const pages: RelayPage[] = [
    { page: metadata.options.defaultGroupName ?? "Options", components: [] },
  ];

  metadata.traverse(
    (key, name: string) => {
      if (key.setting === "" || key.hidden) return;

      const component: ComponentSetting = {
        type: "string",
        name: key.key ?? name,
        description: key.help || "No Description Provided",
        preference: key.setting ?? `${metadata.scriptName}_${key.key ?? name}`,
        default: "default" in key ? `${key["default"]}` : undefined,
      };

      if (key.valueHelpName === "FLAG" || key.valueHelpName === "BOOLEAN") {
        component.type = "boolean";
      } else if (key.options !== undefined) {
        component.type = "dropdown";
        component.dropdown = key.options.map(([k, desc]) => {
          return { display: desc ?? k, value: k };
        });
      }
      pages[pages.length - 1].components.push(component);
    },
    (group, name: string) => {
      pages.push({ page: name, components: [] });
    }
  );

  pages
    .filter((p) => p.components.length > 0)
    .forEach((p) => {
      const html: ComponentHtml = {
        type: "html",
        data: `<h1 style="text-align: center;">Goorbo ${p.page}</h1><div class="meat"> <div> <img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"></img></div><div><img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"></img></div><div> <img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px" ></img></div><div><img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"></img></div><div> <img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"></img></div><div> <img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"></div><div><img src="https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"></div>`,
      };
      const meat: ComponentHtml = {
        type: "html",
        data: `<div class="meat">${`<div style="background-image: https://i.imgur.com/Otj39Jg.png" height="75px" width="75px"/>`.repeat(
          7
        )}</div>`,
      };
      p.components.splice(0, 0, html);
      p.components.push(meat);
    });

  const simPerms: ComponentHtml = {
    type: "html",
    data: checkReqs(false),
  };

  pages.push({ page: "Sim", components: [simPerms] });

  return pages.filter((page) => page.components.length > 0);
}

export function main() {
  if (handleApiRequest()) return;

  write(
    generateHTML(convertArgsToHtml(), {
      css: ".meat,.meat div{position:absolute}.meat{width:100%;height:100%;top:0;left:0;overflow:hidden;opacity: 10%;z-index: 10;pointer-events: none}.meat div{display:block}.meat div:first-child{left:20%;animation:15s linear -2s infinite fall}.meat div:nth-child(2){left:70%;animation:15s linear -4s infinite fall}.meat div:nth-child(3){left:10%;animation:20s linear -7s infinite fall}.meat div:nth-child(4){left:50%;animation:18s linear -5s infinite fall}.meat div:nth-child(5){left:85%;animation:14s linear -5s infinite fall}.meat div:nth-child(6){left:15%;animation:16s linear -10s infinite fall}.meat div:nth-child(7){left:90%;animation:15s linear -4s infinite fall}@keyframes fall{0%{opacity:1;top:-10%;transform:translateX (20px) rotate(0)}20%{opacity:.8;transform:translateX (-20px) rotate(45deg)}40%{transform:translateX (-20px) rotate(90deg)}60%{transform:translateX (-20px) rotate(135deg)}80%{transform:translateX (-20px) rotate(180deg)}100%{top:110%;transform:translateX (-20px) rotate(225deg)}}",
    })
  );
}
