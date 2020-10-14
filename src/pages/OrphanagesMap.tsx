import React from 'react';
import mapMarkerImg from "../images/map-marker.svg";
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/pages/orpahanges-map.css';
import mapIcon from '../utils/mapIcon';

const OrphanagesMap: React.FC = () => (
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

            <Marker
                position={[-5.08921, -42.8016]}
                icon={mapIcon}
            >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                    Lar das Meninas

                    <Link to="/orphanages/1">
                        <FiArrowRight size={20} color="#FFF"/>
                    </Link>
                </Popup>
            </Marker>
        </Map>

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
);

export default OrphanagesMap;