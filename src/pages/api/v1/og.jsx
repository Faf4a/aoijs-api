import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: "edge"
};

const font = fetch(new URL("../../assets/Whitney.ttf", import.meta.url)).then((res) => res.arrayBuffer());
const fontHeader = fetch(new URL("../../assets/Ginto-Nord.ttf", import.meta.url)).then((res) => res.arrayBuffer());

export default async function generate(req, res) {
    const inter = await font;
    const interbold = await fontHeader;

    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "Create Discord Bots with Ease";
    let description = searchParams.get("description") || "The easiest way to create Discord Bots with the power of Discord.js";
    
    const regex = new RegExp(`\\b${title}\\s+(?:will\\s+)?(\\w+)`, 'i');

    description = description.replace(regex, (match, verb) => {
        return `${verb.charAt(0).toUpperCase() + verb.slice(1)}s`;
    });

    const npmPackage = searchParams.get("package") || "aoi.js";

    const titleFontSize = title.length > 15 ? "100px" : "150px";

    return new ImageResponse(
        (
            <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center vertically
                alignItems: "flex-start", // Align to the left horizontally
                backgroundColor: "#100c08",
                position: "relative",
                overflow: "hidden",
                padding: "40px 40px 0 40px"
            }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "radial-gradient(circle at center, rgba(118, 222, 255, 0.5), transparent 70%)",
                        opacity: 0.5
                    }}
                />

                <div
                    style={{
                        fontSize: "45px",
                        fontFamily: "'inter'",
                        display: "flex",
                        color: "#A9A9A9",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                        marginBottom: "10px"
                    }}
                >
                    @aoijs/{npmPackage}
                </div>

                <div
                    style={{
                        fontSize: titleFontSize,
                        fontFamily: "'interbold'",
                        color: "#ffffff",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                        marginBottom: "20px",
                        lineHeight: "1.2",
                        maxWidth: "1800px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontSize: "60px",
                        fontFamily: "'inter'",
                        color: "#ffffff",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                        textAlign: "left",
                        maxWidth: "1400px",
                        marginBottom: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2
                    }}
                >
                    {description}
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
            fonts: [
                {
                    name: "inter",
                    data: inter,
                    style: "normal"
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
