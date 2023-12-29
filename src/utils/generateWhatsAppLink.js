export function generateWhatsAppLink(date, descriptions, fileURLs) {
    let text = `*Registro de actividad:*\n*Fecha:*\n${date}\n\n`;

    descriptions.forEach((desc, index) => {
        text += `*Descripción:*\n${desc}\n*Link de descarga:*\n${fileURLs[index]}\n`;
    });

    const encodedText = encodeURIComponent(text);
    return `whatsapp://send?text=${encodedText}`;
}
