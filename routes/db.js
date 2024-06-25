const express = require('express');
const pool = require('../models/connection');
const router = express.Router();

// Endpoint para obtener las capas del esquema "ruido"
router.get('/layers', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'ruido';
    `;

    const result = await client.query(query);
    client.release();

    const layers = result.rows.map(row => row.table_name);
    res.json(layers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint para obtener las capas del esquema "mediciones"
router.get('/layersM', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'medicion';
    `;

    const result = await client.query(query);
    client.release();

    const layers = result.rows.map(row => row.table_name);
    res.json(layers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint para obtener las capas del esquema "fotografias"
router.get('/layersF', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'fotografias';
    `;

    const result = await client.query(query);
    client.release();

    const layers = result.rows.map(row => row.table_name);
    res.json(layers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint para obtener los polígonos en formato GeoJSON del esquema "ruido"
router.get('/polygons/:layer', async (req, res) => {
  const { layer } = req.params;

  try {
    const client = await pool.connect();
    const query = `
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(features.feature)
      ) AS geojson
      FROM (
        SELECT jsonb_build_object(
          'type', 'Feature',
          'id', id,
          'geometry', ST_AsGeoJSON(geom)::jsonb,
          'properties', to_jsonb(inputs) - 'geom'
        ) AS feature
        FROM (SELECT * FROM ruido.${layer}) inputs
      ) features;
    `;

    const result = await client.query(query);
    client.release();

    res.json(result.rows[0].geojson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint para obtener los polígonos en formato GeoJSON del esquema "mediciones"
router.get('/polygonsM/:layer', async (req, res) => {
  const { layer } = req.params;

  try {
    const client = await pool.connect();
    const query = `
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(features.feature)
      ) AS geojson
      FROM (
        SELECT jsonb_build_object(
          'type', 'Feature',
          'id', id,
          'geometry', ST_AsGeoJSON(geom)::jsonb,
          'properties', to_jsonb(inputs) - 'geom'
        ) AS feature
        FROM (SELECT * FROM medicion.${layer}) inputs
      ) features;
    `;

    const result = await client.query(query);
    client.release();

    res.json(result.rows[0].geojson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint para obtener los polígonos en formato GeoJSON del esquema "fotografias"
router.get('/polygonsF/:layer', async (req, res) => {
  const { layer } = req.params;

  try {
    const client = await pool.connect();
    const query = `
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(features.feature)
      ) AS geojson
      FROM (
        SELECT jsonb_build_object(
          'type', 'Feature',
          'id', id,
          'geometry', ST_AsGeoJSON(geom)::jsonb,
          'properties', to_jsonb(inputs) - 'geom'
        ) AS feature
        FROM (SELECT * FROM fotografias.${layer}) inputs
      ) features;
    `;

    const result = await client.query(query);
    client.release();

    res.json(result.rows[0].geojson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/layersShpBase', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'shp_base';
    `;

    const result = await client.query(query);
    client.release();

    const layers = result.rows.map(row => row.table_name);
    res.json(layers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/polygonsShpBase/:layer', async (req, res) => {
  const layer = req.params.layer;
  try {
      const result = await pool.query(`SELECT ST_AsGeoJSON(geom) as geometry, * FROM shp_base.${layer}`);
      const features = result.rows.map(row => ({
          type: 'Feature',
          geometry: JSON.parse(row.geometry),
          properties: row,
      }));
      res.json({ type: 'FeatureCollection', features });
  } catch (error) {
      console.error('Error fetching polygons:', error);
      res.status(500).json({ error: 'Error fetching polygons' });
  }
});

module.exports = router;
