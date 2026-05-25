<template>
    <p> Contact template</p>

    <fieldset>
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" pattern="[A-Za-z]+" required>
        <br>
        <label for="email"> Your Email:</label>
        <input type="text" id="email" name="email" pattern="[\w\.]+@[A-Za-z.]+" required>
        <br>
        <label for="subject"> Email Subject:</label>
        <input type="text" id="subject" name="subject" required>
        <br>
        <p><label for="message">Your message:</label></p>
        <textarea id="message" name="message" rows="4" cols="50"required></textarea>
    </fieldset>
    <button type="button" onclick="alert('Email sent successfully')">Send email</button>

</template>
<style>
input{
    margin: 10px;
}
</style>
