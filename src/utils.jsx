export const sendDataToGoogleScript = async (data) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyadMIxvO1Ms3vjyuw7_rpByyRb7EpVmFGffSqLV7qQvM9dWubt5FRnGNAn17ix7o6rnw/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: "no-cors"
        });



        const result = response;
        console.log('Success:', result);
    } catch (error) {
        console.log(error);

        console.error('Error:', error);
    }
}