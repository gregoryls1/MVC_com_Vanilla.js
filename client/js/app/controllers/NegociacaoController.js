class NegociacaoController{
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
                
        this._negociacoesView = new NegociacoesView($('#negociacoesView')); 
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            this._negociacoesView,
            'adiciona', 'esvazia');
            
        
        this._mensagemView = new MensagemView($('#mensagemView'));
        
        this._mensagem = new Bind(
            new Mensagem(),
            this._mensagemView,
            'texto');
            
    }
    
    importaNegociacoes() {
            
        let service = new NegociacaoService();
        
        Promise.all([
            service.obterNegociacoesDaSemana()]
                ).then(negociacoes =>{
                    negociacoes
                        .reduce((arrayFlat, array) => arrayFlat.concat(array), [])
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        })
        .catch(err => this._mensagem.texto = err);
    }
    
    adiciona(event){
        event.preventDefault();  
            
        
    this._listaNegociacoes.adiciona(this._criarNegociacao());        
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._limpaFormulario();
    }
    
    apaga(){
        
        this._listaNegociacoes.esvazia();        
        this._mensagem.texto = "Negociações apagadas com sucesso.";
}
    
    _criarNegociacao(){
        
        let data = DateHelper.textoParaData(this._inputData.value); 

        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario(){
        
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        
        this._inputData.focus();        
    }
};