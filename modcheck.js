function exploits() {
    document.querySelector('#exploit-container').hidden = false;
}
function modcheck() {
    pass = "xfcfvfbf";
    if(document.querySelector('#modcheck').value == pass) {
        exploits()
    }
    else {
        alert('Incorrect Password.')
    }
}
let draggin;
const exploit_container = document.querySelector('#exploit-container')
document.addEventListener('mousedown', (e)=>{
    draggin = true
})
document.addEventListener('mouseup', (e)=>{
    draggin = false
})
exploit_container.addEventListener('mousemove', (e)=>{
    if(draggin==true) {
        $('#exploit-container').css('top', e.clientY - 10 + "px")
        $('#exploit-container').css("left", e.clientX - 50 + "px")
    }
})
function closeExploits() {
    exploit_container.hidden = true;
    $('#exploit-container').css('top', 0)
    $('#exploit-container').css('left', 0)
}