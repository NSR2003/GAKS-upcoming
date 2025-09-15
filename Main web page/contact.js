let form = document.getElementById('contact-form');

form.addEventListener('submit', async function (e) {
    event.preventDefault();
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    try{
        let response = await fetch("http://localhost:3000/api/contact",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });
        const data = await response.json();
        if(data.success){
            document.getElementById("form-response").textContent = "✅ Message sent successfully!";
            document.getElementById("contact-form").reset();
        }
        else{
            document.getElementById("form-response").textContent = "❌" + (data.error || "Something went wrong!");
        }
    }
    catch(err){
        console.log(err);
        document.getElementById("form-response").textContent = "⚠️ Server error, please try again later.";
    }
});