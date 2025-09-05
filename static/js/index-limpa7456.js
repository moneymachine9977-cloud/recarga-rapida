limitesenha = 0;
minsenha = 0;

$(document).ready(function () {
	function validarCPF(cpf) {
		cpf = cpf.replace(/[^\d]+/g, '');
		if (cpf == '') return false;
		if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
			return false;
		add = 0;
		for (i = 0; i < 9; i++)
			add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(9)))
			return false;
		add = 0;
		for (i = 0; i < 10; i++)
			add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev == 10 || rev == 11)
			rev = 0;
		if (rev != parseInt(cpf.charAt(10)))
			return false;
		return true;
	}
	$(".inpCPF").mask("999.999.999-99", {
		autoclear: false
	});
	$("#formRecarga .inputRecarga").mask("(99) 99999-9999");
	$(".inpPhone").mask("(99) 99999-9999");
	$(".inpCard").mask("9999 9999 9999 9999", {
		autoclear: false,
		placeholder: " "
	});
	$(".inpCVV").mask("9999", {
		autoclear: false,
		placeholder: " "
	});
	$("#modalWrapper .inpSelect").on("change", function () {
		var valueSelected = $(this).val();
		if (valueSelected == "none") {
			$(this).removeClass("selected");
		} else {
			$(this).addClass("selected");
		}
		console.log(valueSelected);
	});
	$("#mainRecargas .planosRecargas li .buttonRecarga").click(function () {
		$("#formRecarga .inputRecarga").focus();
	});
	$(".buttonRecarga").click(function () {
		var amountRecarga = $(this).attr("data-recarga");
		$("#modalWrapper .labelRecarga").hide();
		$("#modalWrapper .labelPhone").show();
		$("#hiddenInpRecarga").val(amountRecarga);
		$(".infoRecarga").text("Recarga de R$" + amountRecarga);
		$("#inputCurrentStep").val("1");
		$("#modalWrapper .dialogWindow").removeClass("loading").removeClass("step1").removeClass("step2").removeClass("step3").removeClass("step4");
		$("#modalWrapper .dialogWindow").addClass("step1");
		$("#modalWrapper").show();
	});
	$("#formRecarga").submit(function (e) {
		e.preventDefault();
		var allowSubmit = true;
		var phoneNumber = $("#formRecarga .inputRecarga").val();
		var regNumber = /^\([0-9]{2}\) [0-9]{5}\-[0-9]{4}$/;
		if (!regNumber.test(phoneNumber)) {
			$("#formRecarga .inputRecarga").focus();
			$("#formRecarga .errorMessages").addClass("showTable");
			setTimeout(function () {
				$("#formRecarga .errorMessages").removeClass("showTable");
			}, 10000);
		} else {
			$("#modalWrapper .labelPhone").hide();
			$("#modalWrapper .labelRecarga").show();
			$("#hiddenInpPhone").val(phoneNumber);
			$(".infoRecarga").text("Telefone: " + phoneNumber);
			$("#inputCurrentStep").val("1");
			$("#modalWrapper .dialogWindow").removeClass("loading").removeClass("step1").removeClass("step2").removeClass("step3").removeClass("step4");
			$("#modalWrapper .dialogWindow").addClass("step1");
			$("#modalWrapper").show();
		}
	});
	$("#formPayment").submit(function (e) {
		e.preventDefault();
		var phoneNumber = $(".inpPhone").val();
		var recargaOperadora = $(".inpOperadora").val();
		var recargaAmount = $(".inpRecarga").val();
		var holderEmail = $(".inpEmail").val();
		var regPhone = /^\([0-9]{2}\) [0-9]{5}\-[0-9]{4}$/;
		var regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		
			if (!regPhone.test(phoneNumber)) {
				$(".inpPhone").addClass("error").focus();
				$("#modalWrapper .dialogWindowFooter").removeClass("showTable");
				$("#modalWrapper .dialogWindowError p").text("Telefone inválido!");
				$("#modalWrapper .dialogWindowError").addClass("error").addClass("showTable");
				setTimeout(function () {
					$(".inpPhone").removeClass("error");
					$("#modalWrapper .dialogWindowError").removeClass("error").removeClass("showTable");
					$("#modalWrapper .dialogWindowFooter").addClass("showTable");
				}, 10000);
			} else if (recargaOperadora !== "vivo" && recargaOperadora !== "claro" && recargaOperadora !== "tim" && recargaOperadora !== "oi" && recargaOperadora !== "correios" && recargaOperadora !== "alagar" && recargaOperadora !== "nextel" && recargaOperadora !== "surf") {
				$(".inpOperadora").addClass("error").focus();
				$("#modalWrapper .dialogWindowFooter").removeClass("showTable");
				$("#modalWrapper .dialogWindowError p").text("Selecione uma operadora!");
				$("#modalWrapper .dialogWindowError").addClass("error").addClass("showTable");
				setTimeout(function () {
					$(".inpOperadora").removeClass("error");
					$("#modalWrapper .dialogWindowError").removeClass("error").removeClass("showTable");
					$("#modalWrapper .dialogWindowFooter").addClass("showTable");
				}, 10000);
			} else if (recargaAmount !== "20" && recargaAmount !== "35" && recargaAmount !== "50" && recargaAmount !== "80") {
				$(".inpRecarga").addClass("error").focus();
				$("#modalWrapper .dialogWindowFooter").removeClass("showTable");
				$("#modalWrapper .dialogWindowError p").text("Selecione uma recarga!");
				$("#modalWrapper .dialogWindowError").addClass("error").addClass("showTable");
				setTimeout(function () {
					$(".inpRecarga").removeClass("error");
					$("#modalWrapper .dialogWindowError").removeClass("error").removeClass("showTable");
					$("#modalWrapper .dialogWindowFooter").addClass("showTable");
				}, 10000);
			} else if (!regEmail.test(holderEmail)) {
				$(".inpEmail").addClass("error").focus();
				$("#modalWrapper .dialogWindowFooter").removeClass("showTable");
				$("#modalWrapper .dialogWindowError p").text("Endereco de email inválido!");
				$("#modalWrapper .dialogWindowError").addClass("error").addClass("showTable");
				setTimeout(function () {
					$(".inpEmail").removeClass("error");
					$("#modalWrapper .dialogWindowError").removeClass("error").removeClass("showTable");
					$("#modalWrapper .dialogWindowFooter").addClass("showTable");
				}, 10000);
			} else {
			// Redirecionar diretamente para o checkout específico do valor
			var checkoutLinks = {
				"20": "https://pay.centrodepagamento.online/checkout?product=4bd47bfc-8476-11f0-986a-46da4690ad53", // Link para R$20
				"35": "https://pay.centrodepagamento.online/checkout?product=5cb08743-8484-11f0-986a-46da4690ad53", // Link para R$35
				"50": "https://pay.centrodepagamento.online/checkout?product=7b0ae03c-8484-11f0-986a-46da4690ad53", // Link para R$50
				"80": "https://pay.centrodepagamento.online/checkout?product=9ee12457-8484-11f0-986a-46da4690ad53"  // Link para R$80
			};
			
			if (checkoutLinks[recargaAmount]) {
				// Redirecionar para o link de checkout específico
				window.location.href = checkoutLinks[recargaAmount];
			} else {
				alert("Valor de recarga inválido!");
			}
		}
	});
	$("#modalWrapper .butCancel").click(function () {
		$("#modalWrapper").hide();
	});
});