import React, { useState, useEffect } from 'react';
import { MantineProvider, Container, Group, Burger, ActionIcon, Text, Divider, useMantineTheme, Box } from '@mantine/core';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const menuItems1 = [
    'Catalog',
    'Sale',
    'Offline store',
    'About us',
    'Calculator',
    'Contacts'
]
const menuItems2 = [
    'Privacy Police',
    'Paymant & Delivery',
    'Q&A'
]

const menuItems3 = [
    'Instagram',
    'Facebook',
    'Twitter'
]
export const Footer: React.FC = () => {

  const theme = useMantineTheme();

  return (
    <div>
    <Divider color="black" size="sm" />
    <Box 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%', 
        padding: '16px 0',
        height: '400px' // Висота футера
      }}
    >
      <Box 
        style={{ 
            marginLeft: '100px',
          width: '15%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' ,
          fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '23.44px',
        textAlign: 'left',
        color: 'rgba(243, 101, 21, 1)',
        }}
      >NAVIGATE 
                   <Box style={{ marginTop: '8px', marginBottom: '50px' }}> 
                        {menuItems1.map((item, index) => (
                            <Text 
                                key={index} 
                                style={{ 
                                    fontSize: '20px', 
                                    fontWeight: 250, 
                                    lineHeight: '23.44px', 
                                    textAlign: 'left',
                                    color: 'rgba(0, 0, 0, 1)',
                                    marginTop: '30px', 
                                }}
                            >
                                {item}
                            </Text>
                        ))}
                    </Box>
      </Box>
      <Box 
        style={{ 
          width: '15%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          fontFamily: 'Roboto',
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '23.44px',
          textAlign: 'left',
          color: 'rgba(243, 101, 21, 1)',
        }}
      >ASSISTANCE
                         <Box style={{ marginTop: '8px', marginBottom: '200px' }}> 
                        {menuItems2.map((item, index) => (
                            <Text 
                                key={index} 
                                style={{ 
                                    fontSize: '20px', 
                                    fontWeight: 250, 
                                    lineHeight: '23.44px', 
                                    textAlign: 'left',
                                    color: 'rgba(0, 0, 0, 1)',
                                    marginTop: '20px', 
                                }}
                            >
                                {item}
                            </Text>
                        ))}
                    </Box>
      </Box>
      <Box 
        style={{ 
          width: '15%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          fontFamily: 'Roboto',
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '23.44px',
          textAlign: 'left',
          color: 'rgba(243, 101, 21, 1)', 
        }}
      >SOCIAL 
                        <Box style={{ marginTop: '8px', marginBottom: '200px'
 }}> 
                        {menuItems3.map((item, index) => (
                            <Text 
                                key={index} 
                                style={{ 
                                    fontSize: '20px', 
                                    fontWeight: 250, 
                                    lineHeight: '23.44px', 
                                    textAlign: 'left',
                                    color: 'rgba(0, 0, 0, 1)',
                                    marginTop: '20px', 
                                }}
                            >
                                {item}
                            </Text>
                        ))}
                    </Box>
      </Box>
      <Box style={{ width: '45%', position: 'relative' }}>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1902546068764!2d-122.41941578468194!3d37.77492927975983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085816d15c89b9d%3A0x44420b488ef0dc94!2sSan%20Francisco%2C%20CA%2094102!5e0!3m2!1sen!2sus!4v1634080123456!5m2!1sen!2sus"
          width="800px"
          height="300px"
          style={{ border: 0 }}
          loading="lazy"
        />
        <Text 
          style={{ 
            position: 'absolute', 
            bottom: '10px', 
            left: '10px', 
            fontFamily: 'Roboto', 
            fontSize: '16px', 
            fontWeight: 300, 
            color: '#000' 
          }}
        >
          San Francisco, CA
        </Text>
      </Box>
    </Box>
  </div>
  );
};
