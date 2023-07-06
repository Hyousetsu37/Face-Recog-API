export async function askClarifai(req, res) {
  try {
    const { input } = req.body;
    const PAT = "6af86f28a1174b60b216aef985cdfffb";
    const USER_NAME = "hyousetsu37";
    const API_ID = "faceRecog";

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_NAME,
        app_id: API_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    const response = await fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    );
    const JsonResponse = await response.json();
    res.send(JsonResponse);
  } catch (error) {
    await res.status(400).json(error);
  }
}

export function handleImage(req, res, db) {
  const id = Number(req.body.id);
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0].entries);
      } else {
        res.status(404).json("Could not find user entries...");
      }
    })
    .catch((err) => {
      res.status(400).json("Error getting entries");
    });
}
