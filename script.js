$(document).ready( function() {
	$('#paginas_range').on('input', function() {
		$('#paginas_number').val( $(this).val() );
	});

	$('#paginas_number').on('change', function() {
		$('#paginas_range').val( $(this).val() );
	});

	$('#paginas_number').on('keyup', function() {
		$('#paginas_range').val( $(this).val() );
	});

	$('#temas_range').on('input', function() {
		$('#temas_number').val( $(this).val() );
	});

	$('#temas_number').on('change', function() {
		$('#temas_range').val( $(this).val() );
	});

	$('#temas_number').on('keyup', function() {
		$('#temas_range').val( $(this).val() );
	});

	var complejidad = {
		personal: {
			descripcion: 'descripcion 1',
			monto: 80000
		},
		standard: {
			descripcion: 'Excelente para pequeñas empresas. Diseño y desarrollo básico pero pulido.',
			monto: 100000
		},
		avanzado: {
			descripcion: 'Excelente para la pequeña empresa. Cuando se necesita un poco más de detalles en el diseño.',
			monto: 120000
		},
		profesional: {
			descripcion: 'Excelente para proyectos que requieren características avanzadas, sistemas eCommerce medianos o gráficos de alta calidad.',
			monto: 140000
		},
		empresarial: {
			descripcion: 'Calidad excepcional y construcción compleja. Perfecto para grandes empresas en busca de un desarrollo con las últimas tendencias.',
			monto: 160000
		},
	};


	$('#complejidad').on('change', function() {
		// explicita
		var indice = $(this).val();
		var objeto = complejidad[ indice ];

		$('#descripcion').html(
			objeto.descripcion
		);

		// implicita
		$('#descripcion').html( 
			complejidad[ $(this).val() ].descripcion 
		);
	});

	var social = {
		facebook: 10000,
		twitter: 8000,
		blog: 5000,
		youtube: 15000
	};

	$('form').on('submit', function(event) {
		event.preventDefault();

		var precio_por_pagina = 5000;
		var monto_paginas = $('#paginas_number').val() * 
							precio_por_pagina;

		var precio_por_tema = 8000;
		var monto_temas = $('#temas_number').val() * 
							precio_por_tema;

		var precio_complejidad = 
		complejidad[ $('#complejidad').val() ].monto;


		var suma_social = 0;
		$.each( $('.social:checked'), function(i, obj) {
			suma_social += social[ $(obj).val() ];
		});

		var subtotal =  monto_paginas + 
						monto_temas + 
						precio_complejidad + 
						suma_social;

		var iva = $('#iva').prop('checked') ? (subtotal * 0.12) : 0;
		var total = subtotal + iva;

		var fecha_inicio = new Date( $('#fecha_inicio').val() );
		var fecha_fin = new Date( $('#fecha_fin').val() );

		var dias = (fecha_fin - fecha_inicio) / 1000 / 60 / 60 / 24;
		var horas = $('#horas').val();

		var honorarios = total / (horas * dias);

		$('#monto_subtotal').html('Bs. ' + subtotal.toFixed(2));
		$('#monto_iva').html('Bs. ' + iva.toFixed(2));
		$('#monto_total').html('Bs. ' + total.toFixed(2));
		$('#monto_honorarios').html('Bs. ' + honorarios.toFixed(2) + ' / Hora');

	});


});