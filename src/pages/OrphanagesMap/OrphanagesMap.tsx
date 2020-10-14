import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import {
    Map,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../../assets/mapmarker.svg';

import './styles.scss';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [180, 0]
})

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    console.log(orphanages)

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/orphanages');
                setOrphanages(response.data)
            } catch (error) {
                console.error(error);
            }
        })()
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Pernambuco</strong>
                    <span>Recife</span>
                </footer>
            </aside>

            <Map
                center={[-8.2897271, -35.0256616]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                key={orphanage.id}
                                icon={mapIcon}
                                position={[orphanage.latitude, orphanage.longitude]}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>

                            </Marker>
                        )
                    })
                }


            </Map>


            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;