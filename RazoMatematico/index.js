const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');


if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname,'../node_modules','.bin','electron')
    });
}

let ventanaPrincipal;

app.on('ready', () => {
    ventanaPrincipal = new BrowserWindow({title: 'Ask Me A Question - Jovanny Rch',
    width: 1100,
    height: 800});
    ventanaPrincipal.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol: 'file',
        slashes: true
        
    }));

    const menuPrincipal = Menu.buildFromTemplate(TemplateMenu);
    Menu.setApplicationMenu(menuPrincipal);

    ventanaPrincipal.on('closed', () => {
        app.quit();
    })

});


const TemplateMenu = [
    {
        label: 'Archivo',
        submenu: [
           /* {
                label: 'Nuevo Producto',
                accelerator: 'Ctrl+N',
                click(){
                    crearVentanaNuevoProducto();
                }
            },
            {
                label: 'Eliminar Todos Los Productos',
                click(){
                    
                }
            },*/
            {
                label: 'Salir',
                accelerator: 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
   
];


if(process.env.NODE_ENV !== 'production'){
    TemplateMenu.push({
        label: 'Desarrollo',
        submenu: [
            {
                label: 'Mostrar/Ocultar',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
               role: 'reload'
            }
        ]
    })
}


function crearVentanaNuevoProducto(){
     ventanaNuevoProducto =  new BrowserWindow({
        width: 900,
        height: 800,
        title: 'Nuevo Producto'
    });

    //ventanaNuevoProducto.setMenu(null);

    ventanaNuevoProducto.loadURL(url.format({
        pathname: path.join(__dirname,'views/nuevoProducto.html'),
        protocol: 'file',
        slashes: true
    }));

    ventanaNuevoProducto.on('closed', () => {
        ventanaNuevoProducto = null;
    })

}


ipcMain.on('productoNuevo', (e,producto) =>{
    console.log(producto);
    ventanaPrincipal.webContents.send('productoNuevo', producto);
});

