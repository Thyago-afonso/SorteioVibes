   const handleSubmit = async (event) => {
       event.preventDefault();
       addLoading();

       const name = document.querySelector('input[name=name]').value.trim();
       const email = document.querySelector('input[name=email]').value.trim();
       const numero = document.querySelector('input[name=numero]').value.trim();

       try {
           const submitResponse = await fetch("https://script.google.com/macros/s/AKfycbzYCcjyjwqAZfCzn6ZMFjqN-bP7YgPCmC_8NGmn50qb7ZQ69SecW7VSpdgBtGCmHNuHPA/exec", {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: new URLSearchParams({
                   name: name,
                   email: email,
                   numero: numero
               })
           });

           const responseText = await submitResponse.text(); // Lê a resposta como texto

           if (!submitResponse.ok) {
               throw new Error(responseText || 'Erro ao enviar os dados através do Google Apps Script.');
           }

           const responseData = JSON.parse(responseText); // Tenta analisar como JSON

           alert("Cadastro realizado com sucesso!");
           form.reset();
       } catch (err) {
           alert("Erro ao enviar os dados: " + err.message);
       } finally {
           removeLoading();
       }
   };
   

form.addEventListener('submit', handleSubmit);
