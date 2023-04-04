const video=$("#camera"),canvas=$("#picture"),ctx=canvas.getContext("2d");function checkPicture(){ctx.drawImage(video,0,0,canvas.width,canvas.height);var imageData=ctx.getImageData(0,0,canvas.width,canvas.height),imageData=jsQR(imageData.data,canvas.width,canvas.height);imageData?(setQRResult("#result",imageData.data),drawLine(ctx,imageData.location),canvas.style.display="block",video.style.display="none",video.pause()):setTimeout(()=>{checkPicture()},300)}function drawLine(ctx,pos,options={color:"blue",size:5}){ctx.strokeStyle=options.color,ctx.lineWidth=options.size,ctx.beginPath(),ctx.moveTo(pos.topLeftCorner.x,pos.topLeftCorner.y),ctx.lineTo(pos.topRightCorner.x,pos.topRightCorner.y),ctx.lineTo(pos.bottomRightCorner.x,pos.bottomRightCorner.y),ctx.lineTo(pos.bottomLeftCorner.x,pos.bottomLeftCorner.y),ctx.lineTo(pos.topLeftCorner.x,pos.topLeftCorner.y),ctx.stroke()}function setQRResult(id,data){$(id).innerHTML=escapeHTML(data)}function $(selector){return document.querySelector(selector)}function escapeHTML(str){str.replace("&","&amp;");return str.replace("'","&#x27;"),str.replace("`","&#x60;"),str.replace('"',"&quot;"),str.replace("<","&lt;"),str.replace(">","&gt;"),str.replace(/\n/,"<br>")}function sendData(){var input=document.getElementById("result").innerText,xhr=new XMLHttpRequest;xhr.open("POST","/data",!0),xhr.setRequestHeader("Content-Type","application/json"),xhr.send(JSON.stringify({QRCodeData:input}))}window.onload=()=>{navigator.mediaDevices.getUserMedia({audio:!1,video:{width:300,height:200,facingMode:"user"}}).then(stream=>{video.srcObject=stream,video.onloadedmetadata=e=>{video.play(),checkPicture()}}).catch(err=>{console.log(err.name+": "+err.message)})};