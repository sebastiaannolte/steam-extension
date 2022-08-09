chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "vote") {
    vote(request.data).then((data) => {
      sendResponse({ message: data });
    });
  }

  if (request.message == "votes") {
    votes(request.data).then((data) => {
      sendResponse({ message: data });
    });
  }

  return true;
});

async function vote(data) {
  var rawResponse = await fetch("https://steam.w0w.eu/vote", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const content = await rawResponse.json();

  return content;
}

async function votes(data) {
  var rawResponse = await fetch("https://steam.w0w.eu/votes/" + data.id, {
    method: "get",
  });

  const content = await rawResponse.json();
  return content;
}
