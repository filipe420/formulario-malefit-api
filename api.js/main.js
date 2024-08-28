function formatarCEP() {
    var cepInput = document.getElementById('cep');
    var cep = cepInput.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após os primeiros 5 dígitos
    }

    cepInput.value = cep; // Atualiza o valor do input
}

// Função para buscar o endereço usando a API ViaCEP
function buscarEndereco() {
    var cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

    if (cep !== "") {
        var validacep = /^[0-9]{8}$/; // Expressão regular para validar o CEP

        if (validacep.test(cep)) {
            // Consulta o webservice ViaCEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        // Atualiza os campos com os valores retornados pela API
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        alert("CEP não encontrado.");
                    }
                })
                .catch(error => console.error('Erro ao buscar o CEP:', error));
        } else {
            alert("Formato de CEP inválido.");
        }
    }
}
