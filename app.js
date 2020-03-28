document.getElementById('boton').addEventListener('click', verFotos)
var indiceActivo=0;
var indiceDes=0;
var ligas =[]

function verFotos(){
    const numeroFotos = document.getElementById('numeroFotos').value

    if(numeroFotos!=='' ){

        if(numeroFotos>100)
        {
            alert('El limite de fotos es 100')
        }
        else{
            var numPag = Math.round( 100/numeroFotos)
            ligas=[]
            for (let index = 0; index < numPag; index++) {
                ligas.push('https://picsum.photos/v2/list/?page='+(index+1)+'&limit='+numeroFotos)
            }
            
            creaLigas()
            MuestraImagenes(ligas[0],1)
        }
    }
    else{
        alert('Escribe ambos campos un numero mayor a cero y menor a 100')
    }

}

function creaLigas()
{
    const barra_li= document.getElementById('paginas-bar')
    if(ligas!==null)
    {   
        let indice=1
        barra_li.innerHTML= ''
        ligas.forEach(function(item){
            barra_li.innerHTML+=`<a href="#" class="btn-pagina" onclick="MuestraImagenes('${item}',${indice})" id="${indice}">${indice}</a>`
            indice = indice+1
        })
    }
}

function MuestraImagenes(url, id){
    
    const a1= document.getElementById(String(id));
    if(indiceDes!=0)
    {
        const a2 = document.getElementById(String(indiceDes))
        a2.style.backgroundColor='white';
    }
    a1.style.backgroundColor='orange'
    indiceDes=id
    
    const xhr = new XMLHttpRequest()
    console.log(url)
    xhr.open('GET',String(url), true)

    xhr.onload=function(){
        if(this.status === 200){
            const objs= JSON.parse(this.responseText)
            let template = ''
            let index=1;
            objs.forEach(function(item){
                template+= `
                <div class="imagen" 
                    style="background-image:url('${item.download_url}'); background-size:cover;"
                    id="${index}"></div>
                `;
                index=index+1
            })
	    document.getElementById('contenedorFotos').innerHTML='';
            document.getElementById('contenedorFotos').innerHTML=template;
        }
    }

    xhr.send()
}