var home_expand_counter = false;

function home_expand() {
    if (home_expand_counter === true) {
        document.getElementById("arrow").style.display = "none";
        setTimeout(function() {document.getElementById("nav_div").style.display = "initial";},100);
        document.getElementById("home").classList.remove("home_expand");
        document.getElementById("home").classList.add("home_shrink");
        home_expand_counter = false;
        return;
    }
    document.getElementById("arrow").style.display = "initial";
    document.getElementById("nav_div").style.display = "none";
    document.getElementById("home").classList.remove("home_shrink");
    document.getElementById("home").classList.add("home_expand");
    home_expand_counter = true;
}