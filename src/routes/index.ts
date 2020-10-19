import { Request, Response, Router } from 'express';
import path from 'path';
import { getRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';

import Country from '../models/Country';

const upload = multer(uploadConfig);

const routes = Router();

routes.get('/countries', async (request: Request, response: Response) => {
	const name = request.query.name;

	const countryRepository = getRepository(Country);
		
	const countries = await countryRepository.find({
		where:name&&{name},
		relations: ['covidInformation'],
	});
		
	return response.json(countries);
});

routes.put('/countries/:id', upload.single('flag'),	async (request: Request, response: Response) => {
	const { id } = request.params;
	const { name } = request.body;

	const countryRepository = getRepository(Country);

	const country = await countryRepository.findOne({id});

	if (country) {
		country.name = name || country.name;
		if(request.file){
			country.flag = process.env.MY_HOST+'/flag/'+request.file.filename;
		}

		await countryRepository.save(country);

		return response.json(country);
	}

	return response.status(404).json({ error: 'Not Found' });
});
	
routes.get('/countries/:id',async(request:Request,response:Response)=>{
	const {id} = request.params;
		
	const countryRepository = getRepository(Country);
		
	const country = await countryRepository.findOne({where:{id},relations:['covidInformation']});
		
	return response.json(country);
});

routes.get('/flag/:filename',(request:Request,response:Response)=>{
	const { filename } = request.params;
					
	return response.sendFile(path.join(__dirname,'..','..','tmp',filename));
});

export default routes;
