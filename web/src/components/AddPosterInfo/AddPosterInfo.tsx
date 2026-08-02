import { useRef, useState } from "react"
import { updatePoster, type PosterType } from "../../data/poster";
import imageCompression from "browser-image-compression";

const STAGES = ["name", "coords", "photo"] as const;

type Props = {
    poster: PosterType
    handleDone: () => void
}

type Coords = { lat: number, long: number }

async function handleSubmit(campaignId: number, posterId: number, description: string | null, coords: Coords | null, photo: string | null) {
    await updatePoster(campaignId, posterId, {
        locationDescription: description,
        locationLat: coords?.lat,
        locationLong: coords?.long,
        locationPhoto: photo,
        posterState: "distributed"
    });
}

export function AddPosterInfo({ poster, handleDone }: Props) {

    const [stage, setStage] = useState<typeof STAGES[number]>("name");

    const [description, setDescription] = useState<string>("");
    const [coords, setCoords] = useState<Coords | null>(null);
    const [photo, setPhoto] = useState<string | null>(null); // a data url with base 64

    const photoPreviewRef = useRef<HTMLImageElement>(null);

    if (poster.posterState !== "generated") {
        return <div>
            <p>You've already put this poster up!</p>
            <button onClick={() => handleDone()}>Go back</button>
        </div>
    }

    return (
        <div>
            Stage {STAGES.indexOf(stage) + 1}
            {
                stage === "name" && <div>
                    <h3>Add description</h3>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <button onClick={() => setStage("coords")}>{description ? "Set" : "Skip"}</button>
                </div>
            }
            {
                stage === "coords" && <div>
                    <h3>Add coordinates</h3>
                    <button onClick={() => {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            const { latitude, longitude } = pos.coords;
                            setCoords({ lat: latitude, long: longitude });
                        });
                    }}>Get current location</button>
                    {coords && <p>Lat: {coords.lat}, Long: {coords.long}</p>}
                    <button onClick={() => setStage("photo")}>{coords ? "Set" : "Skip"}</button>
                </div>
            }
            {
                stage === "photo" && <div>
                    <h3>Add photo</h3>
                    <input type="file" accept="image/" multiple={false} capture="environment" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;


                        const compressedFile = await imageCompression(file, {
                            maxWidthOrHeight: 768,
                            useWebWorker: true,
                            maxSizeMB: 0.2,
                            fileType: "image/jpeg"
                        });

                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const dataUrl = event?.target?.result as string;

                            if (!dataUrl) {
                                alert("Error loading image");
                            }

                            // 1. Display image preview
                            if (photoPreviewRef?.current) {
                                photoPreviewRef.current.src = dataUrl;
                            }

                            console.log(dataUrl);
                            // 2. Get Base64
                            const base64 = dataUrl.split(",")[1]; // Removes "data:image/jpeg;base64,"
                            setPhoto(base64);
                            console.log(base64);

                        };

                        reader.readAsDataURL(compressedFile);
                    }}/>
                    <img ref={photoPreviewRef}/>
                    <button onClick={async () => {
                        await handleSubmit(poster.campaignId, poster.posterId, description === "" ? null : description, coords, photo);
                        handleDone();
                    }}>{photo ? "Set and submit" : "Skip and submit"}</button>
                </div>
            }
        </div>
    );
}