import { BackendProvider } from "lincd-server-utils/lib/utils/BackendProvider";
import { ShapeSet } from "lincd/lib/collections/ShapeSet";
import { House } from "./shapes/House";
import { Shape, ShapeLike } from "lincd/lib/shapes/Shape";
import { parse } from "csv-parse/sync";
import path from "path";
import { readFile } from "fs/promises";
import { NamedNode } from "lincd/lib/models";
import { houses } from "./ontologies/houses";

export class CodeChallengeBackendProvider extends BackendProvider {
    constructor(server) {
        super(server);
    }

    async importData() {
        let mapping: Map<string, NamedNode> = new Map();
        mapping.set("price", houses.price);
        mapping.set("type", houses.propertyType);
        mapping.set("title", houses.title);
        mapping.set("img", houses.image);
        mapping.set("new", houses.isNew);

        let importResult = await this.convertCSVToShapes(
            path.join("data", "other-houses.csv"),
            House,
            mapping
        );
        return importResult;
    }

    async convertCSVToShapes(
        csvPath,
        shapeClass: typeof Shape,
        csvFieldsToShapeFieldsMapping
    ): Promise<ShapeSet> {
        const data = await readFile(csvPath);

        let result = new ShapeSet();

        const records: string[][] = parse(data, { delimiter: "," });

        const columns = records.shift();

        records.forEach((record) => {
            let shapeInstance = new (shapeClass as any)();

            record.forEach((value, i) => {
                const pShapes = shapeInstance.nodeShape.getPropertyShapes();
                const accessor = pShapes.find(
                    (p) =>
                        p.path == csvFieldsToShapeFieldsMapping.get(columns[i])
                );

                shapeInstance[accessor.label] = value;
            });

            result.add(shapeInstance);
        });

        return result;
    }
}
