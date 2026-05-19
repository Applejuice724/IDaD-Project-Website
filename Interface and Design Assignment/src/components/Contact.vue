<template>
    <p> Contact template</p>

    <fieldset>
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" pattern="[A-Za-z]+" required>
        <label for="email"> Your Email:</label>
        <input type="text" id="email" name="email" pattern="[\w\.]+@[A-Za-z.]+" required>
        <label for="subject"> Email Subject:</label>
        <input type="text" id="subject" name="subject" required>
        <label for="message">Your message:</label>
        <input type="textarea" id="message" name="message" required>
    </fieldset>
    <button type="button" onclick="alert('Email sent successfully')">Send email</button>

</template>
