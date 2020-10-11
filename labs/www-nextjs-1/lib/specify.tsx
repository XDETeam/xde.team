import { createContext } from "react";
import { SimpleSpecStorage } from "./SimpleSpecStorage";
import { ISpec } from "./ISpec";
import { ISpecify } from "./ISpecify";
import { ISpecElement } from "./ISpecElement";

export const SpecContext = createContext<ISpec>({ id: "", instructions: [] });

export const specify: ISpecify = (id, element) => {
    const spec: ISpecElement = {
        id,
        instructions: [],
        element
    };

    spec.element = <SpecContext.Provider value={spec}>
        {element}
    </SpecContext.Provider>

    // TODO:Check if exists
    specify.storage.set(id, spec);

    //TODO:
    if (element) {
        if (element.props.children instanceof Array) {
            element.props.children?.forEach((child) => {
                console.log(`-- ${(child.type as Function).name}`);
                //TODO:if relation
                spec.instructions.push(child)
            });
        }
    }

    return spec;
}

specify.storage = new SimpleSpecStorage();
