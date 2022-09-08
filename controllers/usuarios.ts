import { Request, Response } from "express";
import Usuario from '../models/usuario';


export const getUsuarios = async(req: Request, res: Response) => {

    //const usuarios = await Usuario.findAll();

    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        (await Usuario.findAndCountAll({ where: query })).count,
        Usuario.findAll({
            where: query
        })
    ]);

    res.json({
        total,
        usuarios
    });

}

export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        res.status(404).json({
            msg: `No existe usuario con el id ${id}`
        });
    }

    if (!usuario.estado)
    {
        res.status(404).json({
            msg: `Se ha eliminado el usuario con el id ${id}`
        });
    }
    
    res.json({
        usuario
    });
}


export const postUsuario = async(req: Request, res: Response) => {

    const {body} = req;

    try {

        // Validar si ya exite el usuario por email
        const existeEmail = await Usuario.findOne({ 
            where: {
                email: body.email 
            }
        });

        if ( existeEmail ) {
            return res.status(400).json({
                msg: `El usuario ${ body.nombre } ya existe`
            })
        }

        const usuario = new Usuario(body);
        await usuario.save();

        res.status(201).json( usuario );
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;
    const {body} = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe el usuario con id ' + id
            });
        }
        
        // TODO: Agregar validacion de correo

        await usuario.update(body);
        res.json({
            usuario
        })        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe el usuario con id ' + id
            });
        }        

        await usuario.update({estado: false});
        res.json({
            usuario
        })        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}