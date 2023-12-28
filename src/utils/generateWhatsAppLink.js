export function generateWhatsAppLink(date, description, fileURLs) {
    const encodedFileURLs = fileURLs.map((url) => encodeURIComponent(url));
    const links = encodedFileURLs.join("%0a%0a");
    const descriptions = description.join("%0a%0a");

    let text = `*Registro de actividad:* 
*Fecha:*\n ${date}
*Descripción*: ${descriptions}
*Links de descarga:* \n`;

    const encodedText = encodeURIComponent(text);

    return `whatsapp://send?text=${encodedText}%0a${links}`;
}
