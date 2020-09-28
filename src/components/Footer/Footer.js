import React from 'react';
import './Footer.css';

const Footer = ({tasksCounter}) => (
<p>Осталось дел: {tasksCounter}</p>
);

export default Footer;