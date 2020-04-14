const sgMail = require("@sendgrid/mail");
const sendGridAPIKey =
	"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";
sgMail.setApiKey(sendGridAPIKey);
const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "insthealthcr@gmail.com",
		subject: name + ", El Equipo de InstHealth le da la Bienvenida",
		html: `<p>Hola, ${name}</p> <p>El Equipo de InstHealth le da una calida bienvenida a nuestro servicio de administracion de hospitales. Nos sentimos muy contentos de que haya escogido nuestros servicios. No dude en explorar el servicio web y comenzar a realizar tareas con nuestra aplicacion. </p> <p>Estamos Para Servirle,</p> <p>Equipo de InstHealth</p>`
	});
};
module.exports = {
	sendWelcomeEmail
};
