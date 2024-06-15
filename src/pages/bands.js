import React, { useEffect, useState } from "react";
import './bands.css';
import Navbar from "../components/nav/navbar";
import { getBands, deleteBand, putBand, postBand } from "../helpers/requests";
import lixo from '../images/lata-de-lixo.png';
import edit from '../images/ferramenta-lapis.png';

const Bands = () => {
    const [bandsData, setBandsData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        name: '',
        release_year: '',
        status: ''
    });
    const [isAdding, setIsAdding] = useState(false);
    const [newBandFormData, setNewBandFormData] = useState({
        name: '',
        release_year: '',
        status: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBands();
                setBandsData(data);
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBand(id);
            const updatedBands = bandsData.filter(band => band.id !== id);
            setBandsData(updatedBands);
        } catch (error) {
            console.error('Erro ao deletar banda:', error);
        }
    };

    const handleUpdate = async (id, updatedBandData) => {
        try {
            await putBand(id, updatedBandData);
            const updatedBands = bandsData.map(band => {
                if (band.id === id) {
                    return { ...band, ...updatedBandData };
                }
                return band;
            });
            setBandsData(updatedBands);
            closeEditForm();
        } catch (error) {
            console.error('Erro ao atualizar banda:', error);
        }
    };

    const openEditForm = (band) => {
        setEditFormData({
            id: band.id,
            name: band.name,
            release_year: band.release_year,
            status: band.status
        });
        setIsEditing(true);
    };

    const closeEditForm = () => {
        setIsEditing(false);
        setEditFormData({
            id: null,
            name: '',
            release_year: '',
            status: ''
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const openAddForm = () => {
        setIsAdding(true);
    };

    const closeAddForm = () => {
        setIsAdding(false);
        setNewBandFormData({
            name: '',
            release_year: '',
            status: ''
        });
    };

    const handleAddSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postBand(newBandFormData);
            const newBand = response.data; // Assuming response contains the newly created band
            setBandsData([...bandsData, newBand]);
            closeAddForm();
        } catch (error) {
            console.error('Erro ao adicionar banda:', error);
        }
    };

    const handleAddInputChange = (event) => {
        const { name, value } = event.target;
        setNewBandFormData({
            ...newBandFormData,
            [name]: value
        });
    };

    if (!bandsData) {
        return <div>Loading...</div>; // Exibir indicador de carregamento enquanto os dados são buscados
    }

    return (
        <div className="bands-container">
            <Navbar />
            <div className="add-band-button">
                <button onClick={openAddForm}>Adicionar Nova Banda</button>
            </div>
            <div className="bands-main">
                {bandsData.map((band, index) => (
                    <div key={index} className='cards'>
                        <img onClick={() => handleDelete(band.id)} src={lixo} alt="" className='lixo' />
                        <img onClick={() => openEditForm(band)} src={edit} alt="" className='edit' />
                        <h2 className='name'>{band.name}</h2>
                        <br />
                        <h2 className='info'>{band.release_year}</h2>
                        <br />
                        <p className='info'>{band.status}</p>
                    </div>
                ))}
            </div>

            {/* Formulário de Edição */}
            {isEditing && (
                <div className="edit-form">
                    <h2>Editar Banda</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editFormData.id, {
                            name: editFormData.name,
                            release_year: editFormData.release_year,
                            status: editFormData.status
                        });
                    }}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleInputChange}
                        />
                        <br />
                        <label>Ano de Lançamento:</label>
                        <input
                            type="text"
                            name="release_year"
                            value={editFormData.release_year}
                            onChange={handleInputChange}
                        />
                        <br />
                        <label>Status:</label>
                        <select
                            name="status"
                            value={editFormData.status}
                            onChange={handleInputChange}
                        >
                            <option value="activate">Ativo</option>
                            <option value="deactivate">Inativo</option>
                        </select>
                        <br />
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={closeEditForm}>Cancelar</button>
                    </form>
                </div>
            )}

            {/* Formulário de Adição */}
            {isAdding && (
                <div className="add-form">
                    <h2>Adicionar Nova Banda</h2>
                    <form onSubmit={handleAddSubmit}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={newBandFormData.name}
                            onChange={handleAddInputChange}
                        />
                        <br />
                        <label>Ano de Lançamento:</label>
                        <input
                            type="text"
                            name="release_year"
                            value={newBandFormData.release_year}
                            onChange={handleAddInputChange}
                        />
                        <br />
                        <label>Status:</label>
                        <select
                            name="status"
                            value={newBandFormData.status}
                            onChange={handleAddInputChange}
                        >
                            <option value="activate">Ativo</option>
                            <option value="deactivate">Inativo</option>
                        </select>
                        <br />
                        <button type="submit">Adicionar</button>
                        <button type="button" onClick={closeAddForm}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Bands;