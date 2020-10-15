import React, { useState, useEffect } from 'react';
import mapMarkerImg from "../images/map-marker.svg";
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/pages/orpahanges-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
};

const MarkerWithPopup = (props: any) => {
    const orphanage: Orphanage = props.orphanage;

    const { latitude, longitude, id, name } = orphanage;

    return (
        <Marker
            position={[latitude, longitude]}
            icon={mapIcon}
            key={`${id}`}
        >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {name}
                <Link to={`/orphanages/${id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                </Link>
            </Popup>
        </Marker>
    )
};

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        fetchOrphanages();
    }, []);

    const fetchOrphanages = async () => {
        try {
            const { data } = await api.get('orphanages');
            setOrphanages(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Teresina</strong>
                    <span>Piauí</span>
                </footer>
            </aside>

            <Map
                center={[-5.08921, -42.8016]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => (
                    <MarkerWithPopup orphanage={orphanage} />
                ))}


            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
};

export default OrphanagesMap;