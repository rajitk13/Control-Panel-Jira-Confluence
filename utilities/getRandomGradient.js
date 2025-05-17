function getRandomGradient() {
    // Function to generate random color in hex format
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Generate two random colors for the gradient
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    // Return the random gradient object
    return { from: color1, to: color2 };
}

export default getRandomGradient;
