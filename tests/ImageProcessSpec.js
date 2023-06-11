
const fs = require("fs");
const path = require("path");
const { default: ImageService } = require("../src/api/services/imageService");

describe("image processing", () => {
    var filePathImageThumb;
    beforeAll((done) => {
        const imagesThumbPath = path.resolve(
            __dirname,
            "../public/assets/images/thumb"
        );

        filePathImageThumb = path.resolve(
            imagesThumbPath,
            `vinh ha long-300x800.jpg`
        );

        // Delete file if existed
        if (fs.existsSync(filePathImageThumb)) {
            fs.rmSync(filePathImageThumb);
        }
        done();
    });
    it("create thumb complete", async () => {

        let params = {
            "filename": "vinh ha long",
            "width": 300,
            "height": 800,
        }

       await ImageService.createImageThumb(params);
        expect(fs.existsSync(filePathImageThumb)).toBeTrue();
    });
});