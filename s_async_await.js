//INFO: como funcionan promesas vs async / await
//SEE: https://javascript.info/async-await
//SEE: https://hackernoon.com/promises-and-error-handling-4a11af37cb0e

function miFunAsyncA(p1) {
	console.log("miFunAsincA",p1,new Date());
	return new Promise( (resolve, reject) => {
		setTimeout(() => {
			console.log("miFunAsincA onTimeout",p1,new Date());
			if (p1.match(/fallar/)) { reject("falle a proposito "+p1); }
			else { resolve("OK "+p1) }
		},1000);
	});
}

function test_promise(como) {
	console.log("TESTEANDO", como);
	var p= miFunAsyncA(como);
	console.log("esperando",como,new Date());
	p
		.then( v => console.log("respondio then",new Date(),v))
		.catch( v => console.log("respondio catch",new Date(),v))
}

if (0) {
test_promise("pruebaBien");
test_promise("fallarAsi");
}
	
async function miFuncConAsyncAwait(comos) { //A: como es async, devuelve promise!
	var result= [];
	for (var como of comos) {
		try {
			console.log("TESTEANDO AWAIT", como);
			let r1= await miFunAsyncA(como);
			console.log("TESTEANDO AWAIT R", como,r1);
			result.push(r1);
		} catch (err) {
			if (err.match(/NO_ATAJAR/)) { 
				console.log("TESTEANDO ERROR Y LANZO",como, err);	
				throw(err); 
			}
			else { console.log("TESTEANDO ATAJE",como, err); }	
		}
	}
	return result;
}

function test_asyncAwait(como) {
	miFuncConAsyncAwait(como.split(" "))
		.then( r => console.log("TEST RESULT THEN",r))
		.catch( err => console.log("TEST RESULT catch",err))
}

//test_asyncAwait("bien1 bien2");
//CONCLUSION: en test_asyncAwait "parece" que todo fuera sync

//test_asyncAwait("bienAntesDeFallar fallarEn2queAtaja bienDespuesDeFallar");
//CONCLUSION: TAMBIEN con las excepciones

test_asyncAwait("bienAntesDeFallar fallarEn2NO_ATAJAR bienPeroNollegaPorqueFallo");
//CONCLUSION: TAMBIEN con las excepciones
