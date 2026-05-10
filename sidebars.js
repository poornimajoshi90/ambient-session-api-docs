// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */

const sidebars = {
  tutorialSidebar: [

    'overview',
    

    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'authentication',
      ],
    },

    {
      type: 'category',
      label: 'API Reference',
      items: [
        'endpoints',
        'webhooks',
        'response-examples',
       
        
      ],
    },

    'best-practices',
   
  ],
};

export default sidebars;