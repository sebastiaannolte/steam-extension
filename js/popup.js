async function loadUser() {
  $.ajax({
    url: "http://localhost:5000/user",
    method: "get",
  })
    .done(function (result) {
      const user = result;
      if (user && user.is_authenticated) {
        $("#loggedin").html(
          `<div class="logged-in-list">
          <div>Logged in as: ${user.name}</div><div class="logout">Logout</div></div>`
        );
      }
    })
    .fail(function (err) {
      $("#loggedin").html("");
      $("#login").show();
    });
}

$("body").on("click", ".logout", async function () {
  await $.ajax({
    url: "http://localhost:5000/logout",
    type: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Reload the Steam pages after logout
  chrome.tabs.query(
    { url: "https://store.steampowered.com/app/*" },
    function (tab) {
      if (tab) {
        chrome.tabs.reload(tab[0].id);
      }
    }
  );

  await loadUser();
});

document.addEventListener("DOMContentLoaded", async function () {
  await loadUser();
});
