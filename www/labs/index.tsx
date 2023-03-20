import { readFileSync } from "fs"
import { globSync } from "glob"
import { DOMParser } from "xmldom"

import Xde from "./xde";
import Self from "./self";
import Social from "./social";
import Software from "./software";

// TODO:Build parental links
export const Labs = {
    Xde,
    Self,
    Social,
    Software
};

export default Labs;

class XmlDatabase {
    public xml;

    constructor() {
        this.xml = new DOMParser().parseFromString("<db></db>");
        const files = globSync("labs/**/*.xml")
        const dbRoot = this.xml.childNodes[0];
        
        files.forEach(path => {
            const xml = readFileSync(path, "utf8");
            const dom = new DOMParser().parseFromString(xml);
            dbRoot.appendChild(dom)
        })        
    }
}

export const Db = new XmlDatabase();
