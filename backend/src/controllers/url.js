import { nanoid } from "nanoid/non-secure";
import { URL } from "../models/url.models.js";

export const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    
    const shortID = nanoid(5);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    return res.json(
    { 
        id: shortID,
    }
);
};

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    })
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}