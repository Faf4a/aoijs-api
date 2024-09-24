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

    description = description.replace(title, "");

    description = description.replace(/\bwill\s+(\w+)/i, (match, word) => {
        return `${word.charAt(0).toUpperCase() + word.slice(1)}s`;
    });

    const npmPackage = searchParams.get("package") || "aoi.js";

    const titleFontSize = title.length > 15 ? "45px" : "60px";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    backgroundColor: "#100c08",
                    position: "relative",
                    overflow: "hidden",
                    padding: "190px 40px 0 40px"
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
                        fontSize: "28px",
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
                        maxWidth: "1000px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {title}
                </div>

                <div
                    style={{
                        fontSize: "28px",
                        fontFamily: "'inter'",
                        color: "#ffffff",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
                        textAlign: "left",
                        maxWidth: "800px",
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
            width: 1200,
            height: 630,
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
