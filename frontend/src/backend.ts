import {BackendProvider} from 'lincd-server-utils/lib/utils/BackendProvider';
import {ShapeSet} from "lincd/lib/collections/ShapeSet";
import {House} from "./shapes/House";
import {Shape} from "lincd/lib/shapes/Shape";
import path from "path";

export class CodeChallengeBackendProvider extends BackendProvider {
    constructor(server) {
        super(server);
    }

    async importData() {

        let mapping = null;
        let importResult = await this.convertCSVToShapes(path.join('data', 'other-houses.csv'), House, mapping);
        return importResult;
    }

    async convertCSVToShapes(csvPath, shapeClass: typeof Shape, csvFieldsToShapeFieldsMapping): Promise<ShapeSet> {
        let result = new ShapeSet();

        //TODO: import data from csvPath
        // use an existing library to parse the contents of the CSV file
        // try to make this method reusable such a way that it could be reused in other places for other types of CSV's and other types of shapes
        // in order to do this, importData will need to send a mapping between the CSV fields and the shape fields,
        // and here in this method you can use that mapping to create a shape instance for each row and then set the shapes' properties.
        // it is up to you how want to make this mapping

        //Tip 1: convert each row to a new instance of the given shape
        //csvRows.forEach(csvRow => {
            //You can use this line to create a new instance of the shape
            let instance = new (shapeClass as any)();

            //Tip2: go over each column in the CSV row and use the CSV cell value to set a value of the shape based on the mapping
            //csvRow.forEach(cellValue => {
                //Use can use something like this, where propertyName would refer to the name of the get-method in the Shape, as defined in the mapping
                // instance[propertyName] = cellValue;

        return result;
    }
}