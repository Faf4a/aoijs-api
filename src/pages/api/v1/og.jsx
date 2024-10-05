import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: "edge"
};

const font = fetch(new URL("../../assets/Whitney.ttf", import.meta.url)).then((res) => res.arrayBuffer());
const fontHeader = fetch(new URL("../../assets/Ginto-Nord.ttf", import.meta.url)).then((res) => res.arrayBuffer());

const calculateFontSize = (description) => {
    const baseSize = 32;
    const characterLimit = 50;
    const reductionPerCharacter = 0.2;

    if (description.length > characterLimit) {
        return baseSize - (description.length - characterLimit) * reductionPerCharacter;
    } else {
        return baseSize;
    }
};

/**
 * @swagger
 * /api/v1/generate:
 *   get:
 *     summary: Generate an image with custom text and styling
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The title text to display on the image
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: The description text to display on the image
 *       - in: query
 *         name: replace
 *         schema:
 *           type: boolean
 *         description: Whether to replace certain words in the description
 *       - in: query
 *         name: gradient
 *         schema:
 *           type: string
 *         description: The color gradient to use for the title text
 *       - in: query
 *         name: logo
 *         schema:
 *           type: boolean
 *         description: Whether to display the logo on the image
 *     responses:
 *       200:
 *         description: The generated image
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
export default async function generate(req, res) {
    const inter = await font;
    const interbold = await fontHeader;

    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "aoi.js Documentation";

    // ?description=<description>
    const hasDescription = searchParams.has("description");
    let description = hasDescription ? searchParams.get("description")?.slice(0, 200) : "Create powerful Discord Bots fast, easy.";

    // ?replace=<boolean>
    const hasReplace = searchParams.has("replace");
    const replace = hasReplace ? searchParams.get("replace") == "true" : true;

    description = hasDescription ? searchParams.get("description")?.slice(0, 200) : "Create powerful Discord Bots fast, easy.";

    if (replace) {
        const words = description.split(" ");
        if (words.length > 2 && words[1] === "will") {
            words[2] = words[2][0].toUpperCase() + words[2].slice(1) + "s";
            words.splice(0, 2);
            description = words.join(" ");
        }
    }

    // ?gradient=<color>
    let gradient;
    switch (searchParams.get("gradient")) {
        case "green":
            gradient = "linear-gradient(90deg, rgb(0, 200, 0), rgb(150, 200, 0))";
            break;
        case "red":
            gradient = "linear-gradient(90deg, rgb(200, 0, 0), rgb(200, 100, 0))";
            break;
        case "yellow":
            gradient = "linear-gradient(90deg, rgb(200, 200, 0), rgb(200, 200, 150))";
            break;
        default:
            gradient = "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))";
            break;
    }

    // ?logo=<boolean>
    const hasLogo = searchParams.has("logo");
    const logo = hasLogo ? searchParams.get("logo") == "true" : true;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    textAlign: "center",
                    position: "relative"
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        backgroundColor: "#000000",
                        backgroundImage: "radial-gradient(circle at 25px 25px, #242424 2%, transparent 0%), radial-gradient(circle at 75px 75px, #242424 2%, transparent 0%)",
                        backgroundSize: "100px 100px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: title.length > 20 ? calculateFontSize(title) : 60,
                            fontStyle: "normal",
                            padding: title.length > 20 ? "10px 15px" : "15px",
                            borderRadius: "10px",
                            fontFamily: "'interbold'",
                            color: "white",
                            marginBottom: 20,
                            lineHeight: 1.4,
                            whiteSpace: "pre-wrap",
                            backgroundImage: gradient
                        }}
                    >
                        {decodeURIComponent(title)}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: calculateFontSize(description),
                            fontStyle: "normal",
                            fontFamily: "'inter'",
                            color: "lightgray",
                            lineHeight: 1.3,
                            whiteSpace: "pre-wrap"
                        }}
                    >
                        {decodeURIComponent(description)}
                    </div>
                </div>
                {logo && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            position: "absolute",
                            bottom: "7px",
                            left: "15px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "5px",
                                opacity: 0.4
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "4px",
                                    marginTop: "8px",
                                    marginBottom: "12.5px",
                                    fontStyle: "normal",
                                    color: "lightgray",
                                    fontFamily: "'inter'"
                                }}
                            >
                                <p style={{ margin: "3px 0", lineHeight: "1" }}>Akarui</p>
                                <p style={{ margin: "3px 0", lineHeight: "1" }}>Development</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "inter",
                    data: inter,
                    style: "bold"
                },
                {
                    name: "interbold",
                    data: interbold,
                    style: "normal"
                }
            ]
        }
    );
}
