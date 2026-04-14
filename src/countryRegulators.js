// Country Regulators — 195 countries (193 UN member states + 2 observers)
// Full agency names, no acronyms. Organized by region.
// Only domains relevant to each country are included.

const COUNTRY_REGULATORS = {

// ═══════════════════════════════════════════════════════════════
// AFRICA — 54 countries
// ═══════════════════════════════════════════════════════════════

"Algeria": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health, Population and Hospital Reform"],
    "Ultra-Processed Food": ["Ministry of Health, Population and Hospital Reform", "Ministry of Commerce"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Oil & Gas Extraction": ["Ministry of Energy and Mines", "Sonatrach (state oil company)"],
    "Global Coal Combustion": ["Ministry of Energy and Mines"],
    "Cement (Calcination Floor)": ["Ministry of Industry"],
    "Water Privatization": ["Ministry of Water Resources"],
    "Forever Chemicals (PFAS)": ["Ministry of Environment and Renewable Energies"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Renewable Energies"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Ministry of Transport", "Civil Aviation Authority"],
    "Commercial Gambling": ["Ministry of Commerce"],
    "Opioid Ecosystem": ["Ministry of Health, Population and Hospital Reform"],
    "Algorithmic Pricing": ["Ministry of Commerce", "Competition Council"],
  }
},

"Angola": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Fisheries"],
    "Oil & Gas Extraction": ["Ministry of Mineral Resources, Petroleum and Gas", "Sonangol (state oil company)"],
    "Water Privatization": ["Ministry of Energy and Water"],
    "Arms Exports": ["Ministry of National Defence"],
    "Global Fisheries": ["Ministry of Agriculture and Fisheries"],
    "Aviation Emissions": ["National Civil Aviation Authority"],
  }
},

"Benin": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health", "Ministry of Agriculture, Livestock and Fisheries"],
    "Topsoil Erosion": ["Ministry of Agriculture, Livestock and Fisheries"],
    "Palm Oil Deforestation": ["Ministry of Living Environment and Sustainable Development"],
    "Water Privatization": ["Ministry of Water and Mines"],
    "Global Fisheries": ["Ministry of Agriculture, Livestock and Fisheries"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
  }
},

"Botswana": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agricultural Development and Food Security"],
    "Water Privatization": ["Water Utilities Corporation", "Ministry of Land Management, Water and Sanitation Services"],
    "Arms Exports": ["Ministry of Defence and Security"],
    "Aviation Emissions": ["Civil Aviation Authority of Botswana"],
    "Industrial Monoculture": ["Ministry of Agricultural Development and Food Security"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Waste Management and Pollution Control"],
  }
},

"Burkina Faso": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Irrigation Development"],
    "Water Privatization": ["National Office for Water and Sanitation"],
    "Industrial Monoculture": ["Ministry of Agriculture and Irrigation Development"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
  }
},

"Burundi": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health and AIDS Control"],
    "Ultra-Processed Food": ["Ministry of Public Health and AIDS Control"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Water Privatization": ["Ministry of Hydraulics, Energy and Mines"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Cabo Verde": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Social Security"],
    "Ultra-Processed Food": ["Ministry of Health and Social Security"],
    "Topsoil Erosion": ["Ministry of Agriculture and Environment"],
    "Water Privatization": ["National Water and Sanitation Agency"],
    "Global Fisheries": ["Ministry of the Sea"],
    "Aviation Emissions": ["Civil Aviation Agency"],
  }
},

"Cameroon": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Palm Oil Deforestation": ["Ministry of Forestry and Wildlife"],
    "Oil & Gas Extraction": ["National Hydrocarbons Corporation"],
    "Water Privatization": ["Ministry of Water and Energy"],
    "Global Fisheries": ["Ministry of Livestock, Fisheries and Animal Industries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Cameroon"],
  }
},

"Central African Republic": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Population"],
    "Ultra-Processed Food": ["Ministry of Health and Population"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Arms Exports": ["Ministry of Defence"],
    "Water Privatization": ["Water and Electricity Distribution Company"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Chad": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Petroleum and Energy"],
    "Water Privatization": ["Ministry of Urban and Rural Water Supply"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Comoros": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Fisheries and Environment"],
    "Global Fisheries": ["Ministry of Agriculture, Fisheries and Environment"],
    "Water Privatization": ["National Water and Electricity Company"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Congo (Republic of the)": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Population"],
    "Ultra-Processed Food": ["Ministry of Health and Population"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Oil & Gas Extraction": ["Ministry of Hydrocarbons", "National Petroleum Company of Congo"],
    "Water Privatization": ["National Water Distribution Company"],
    "Palm Oil Deforestation": ["Ministry of Forest Economy"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
    "Arms Exports": ["Ministry of Defence"],
  }
},

"Democratic Republic of the Congo": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Mines"],
    "Palm Oil Deforestation": ["Ministry of Environment and Sustainable Development"],
    "Water Privatization": ["National Water Distribution Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Sustainable Development"],
  }
},

"Côte d'Ivoire": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Public Hygiene"],
    "Ultra-Processed Food": ["Ministry of Health and Public Hygiene"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Palm Oil Deforestation": ["Ministry of Water and Forests"],
    "Water Privatization": ["Water Distribution Company of Côte d'Ivoire"],
    "Global Fisheries": ["Ministry of Animal and Fishery Resources"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
    "Aviation Emissions": ["National Civil Aviation Authority"],
    "Algorithmic Pricing": ["Competition Commission"],
  }
},

"Djibouti": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Water Privatization": ["Djibouti National Water Office"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Egypt": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Population"],
    "Ultra-Processed Food": ["National Food Safety Authority", "Ministry of Health and Population"],
    "Topsoil Erosion": ["Ministry of Agriculture and Land Reclamation"],
    "Oil & Gas Extraction": ["Egyptian General Petroleum Corporation", "Ministry of Petroleum and Mineral Resources"],
    "Cement (Calcination Floor)": ["Ministry of Trade and Industry", "Industrial Development Authority"],
    "Water Privatization": ["Holding Company for Water and Wastewater"],
    "Forever Chemicals (PFAS)": ["Egyptian Environmental Affairs Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Egyptian Environmental Affairs Agency"],
    "Arms Exports": ["Ministry of Defence and Military Production"],
    "Aviation Emissions": ["Egyptian Civil Aviation Authority"],
    "Opioid Ecosystem": ["Ministry of Health and Population"],
    "Commercial Gambling": ["Ministry of Tourism"],
    "Algorithmic Pricing": ["Egyptian Competition Authority"],
    "Global Fisheries": ["General Authority for Fish Resources Development"],
    "Gig Economy Platforms": ["Ministry of Manpower"],
    "Industrial Monoculture": ["Ministry of Agriculture and Land Reclamation"],
    "Global Coal Combustion": ["Egyptian Environmental Affairs Agency"],
  }
},

"Equatorial Guinea": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Social Welfare"],
    "Ultra-Processed Food": ["Ministry of Health and Social Welfare"],
    "Oil & Gas Extraction": ["Ministry of Mines and Hydrocarbons"],
    "Water Privatization": ["Ministry of Health and Social Welfare"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Eritrea": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Ministry of Land, Water and Environment"],
    "Global Fisheries": ["Ministry of Marine Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Eswatini": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Eswatini Water Services Corporation"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Aviation Emissions": ["Eswatini Civil Aviation Authority"],
  }
},

"Ethiopia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ethiopian Food and Drug Authority"],
    "Ultra-Processed Food": ["Ethiopian Food and Drug Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Ministry of Water and Energy"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Aviation Emissions": ["Ethiopian Civil Aviation Authority"],
    "Arms Exports": ["Ministry of Defence"],
    "Opioid Ecosystem": ["Ethiopian Food and Drug Authority"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Affairs"],
  }
},

"Gabon": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Petroleum and Gas"],
    "Palm Oil Deforestation": ["Ministry of Water, Forests, Sea and Environment"],
    "Water Privatization": ["Energy and Water Company of Gabon"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
  }
},

"Gambia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Global Fisheries": ["Ministry of Fisheries and Water Resources"],
    "Water Privatization": ["National Water and Electricity Company"],
    "Aviation Emissions": ["Gambia Civil Aviation Authority"],
  }
},

"Ghana": {
  region: "Africa",
  domains: {
    "Tobacco": ["Food and Drugs Authority"],
    "Ultra-Processed Food": ["Food and Drugs Authority", "Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Food and Agriculture"],
    "Oil & Gas Extraction": ["Petroleum Commission", "Ghana National Petroleum Corporation"],
    "Palm Oil Deforestation": ["Forestry Commission"],
    "Water Privatization": ["Ghana Water Company Limited", "Public Utilities Regulatory Commission"],
    "Global Fisheries": ["Fisheries Commission"],
    "Industrial Monoculture": ["Ministry of Food and Agriculture"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Ghana Civil Aviation Authority"],
    "Opioid Ecosystem": ["Food and Drugs Authority"],
    "Algorithmic Pricing": ["Ghana Competition Commission (planned)"],
    "Gig Economy Platforms": ["Ministry of Employment and Labour Relations"],
  }
},

"Guinea": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Mines and Geology"],
    "Water Privatization": ["Water Company of Guinea"],
    "Global Fisheries": ["Ministry of Fisheries and Maritime Economy"],
    "Aviation Emissions": ["National Civil Aviation Directorate"],
  }
},

"Guinea-Bissau": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Global Fisheries": ["Ministry of Fisheries"],
    "Water Privatization": ["Ministry of Natural Resources"],
    "Aviation Emissions": ["Civil Aviation Institute"],
  }
},

"Kenya": {
  region: "Africa",
  domains: {
    "Tobacco": ["Tobacco Control Board", "Ministry of Health"],
    "Ultra-Processed Food": ["Kenya Bureau of Standards", "Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock Development"],
    "Water Privatization": ["Water Services Regulatory Board"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock Development"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Kenya Civil Aviation Authority"],
    "Opioid Ecosystem": ["Pharmacy and Poisons Board"],
    "Commercial Gambling": ["Betting Control and Licensing Board"],
    "Algorithmic Pricing": ["Competition Authority of Kenya"],
    "Global Fisheries": ["Kenya Fisheries Service"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Protection"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["National Environment Management Authority"],
    "Forever Chemicals (PFAS)": ["National Environment Management Authority"],
    "Oil & Gas Extraction": ["Energy and Petroleum Regulatory Authority"],
    "Cement (Calcination Floor)": ["National Environment Management Authority"],
  }
},

"Lesotho": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food Security"],
    "Water Privatization": ["Water and Sewerage Company"],
    "Aviation Emissions": ["Department of Civil Aviation"],
  }
},

"Liberia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Palm Oil Deforestation": ["Forestry Development Authority"],
    "Global Fisheries": ["National Fisheries and Aquaculture Authority"],
    "Water Privatization": ["Liberia Water and Sewer Corporation"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Liberia Civil Aviation Authority"],
  }
},

"Libya": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Oil & Gas Extraction": ["National Oil Corporation"],
    "Water Privatization": ["General Water Authority"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Libyan Civil Aviation Authority"],
  }
},

"Madagascar": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Palm Oil Deforestation": ["Ministry of Environment and Sustainable Development"],
    "Water Privatization": ["Water and Electricity Utility of Madagascar"],
    "Global Fisheries": ["Ministry of Fisheries and Blue Economy"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
    "Aviation Emissions": ["Civil Aviation Authority of Madagascar"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of Environment and Sustainable Development"],
  }
},

"Malawi": {
  region: "Africa",
  domains: {
    "Tobacco": ["Tobacco Commission", "Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Lilongwe Water Board", "Blantyre Water Board"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Global Fisheries": ["Department of Fisheries"],
  }
},

"Mali": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Social Development"],
    "Ultra-Processed Food": ["Ministry of Health and Social Development"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Mali Water Utility"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Arms Exports": ["Ministry of Defence and Veterans Affairs"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
    "Global Fisheries": ["Ministry of Livestock and Fisheries"],
  }
},

"Mauritania": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Petroleum, Mines and Energy"],
    "Global Fisheries": ["Ministry of Fisheries and Maritime Economy"],
    "Water Privatization": ["National Water Company"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Mauritius": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Wellness"],
    "Ultra-Processed Food": ["Ministry of Health and Wellness"],
    "Topsoil Erosion": ["Ministry of Agro-Industry and Food Security"],
    "Water Privatization": ["Central Water Authority"],
    "Global Fisheries": ["Ministry of Blue Economy, Marine Resources, Fisheries and Shipping"],
    "Commercial Gambling": ["Gambling Regulatory Authority"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Algorithmic Pricing": ["Competition Commission of Mauritius"],
    "Gig Economy Platforms": ["Ministry of Labour, Human Resource Development and Training"],
  }
},

"Morocco": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Social Protection"],
    "Ultra-Processed Food": ["National Office of Food Safety", "Ministry of Health and Social Protection"],
    "Topsoil Erosion": ["Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests"],
    "Oil & Gas Extraction": ["National Office of Hydrocarbons and Mines"],
    "Water Privatization": ["National Office of Electricity and Drinking Water"],
    "Global Fisheries": ["Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests"],
    "Industrial Monoculture": ["Ministry of Agriculture, Maritime Fisheries, Rural Development and Water and Forests"],
    "Forever Chemicals (PFAS)": ["Ministry of Energy Transition and Sustainable Development"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Energy Transition and Sustainable Development"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Trade"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["Ministry of Economic Inclusion, Small Business, Employment and Skills"],
    "Commercial Gambling": ["Ministry of Interior"],
  }
},

"Mozambique": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Oil & Gas Extraction": ["National Petroleum Institute"],
    "Water Privatization": ["Water Supply Investment and Assets Fund"],
    "Global Fisheries": ["Ministry of Sea, Inland Waters and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
    "Global Coal Combustion": ["Ministry of Mineral Resources and Energy"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Mozambique"],
  }
},

"Namibia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Social Services"],
    "Ultra-Processed Food": ["Ministry of Health and Social Services"],
    "Topsoil Erosion": ["Ministry of Agriculture, Water and Land Reform"],
    "Water Privatization": ["Namibia Water Corporation"],
    "Global Fisheries": ["Ministry of Fisheries and Marine Resources"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Mines and Energy"],
    "Arms Exports": ["Ministry of Defence and Veterans Affairs"],
    "Aviation Emissions": ["Namibia Civil Aviation Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture, Water and Land Reform"],
  }
},

"Niger": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Water Utility Company of Niger"],
    "Oil & Gas Extraction": ["Ministry of Petroleum"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
  }
},

"Nigeria": {
  region: "Africa",
  domains: {
    "Tobacco": ["National Tobacco Control Committee", "Federal Ministry of Health"],
    "Ultra-Processed Food": ["National Agency for Food and Drug Administration and Control", "Federal Ministry of Health"],
    "Topsoil Erosion": ["Federal Ministry of Agriculture and Rural Development"],
    "Oil & Gas Extraction": ["Nigerian National Petroleum Company", "Nigerian Upstream Petroleum Regulatory Commission", "Nigerian Midstream and Downstream Petroleum Regulatory Authority"],
    "Palm Oil Deforestation": ["Federal Ministry of Environment"],
    "Water Privatization": ["Federal Ministry of Water Resources"],
    "Global Fisheries": ["Federal Department of Fisheries"],
    "Industrial Monoculture": ["Federal Ministry of Agriculture and Rural Development"],
    "Forever Chemicals (PFAS)": ["National Environmental Standards and Regulations Enforcement Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["National Environmental Standards and Regulations Enforcement Agency"],
    "Cement (Calcination Floor)": ["Federal Ministry of Industry, Trade and Investment"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Nigerian Civil Aviation Authority"],
    "Opioid Ecosystem": ["National Drug Law Enforcement Agency", "National Agency for Food and Drug Administration and Control"],
    "Commercial Gambling": ["National Lottery Regulatory Commission"],
    "Algorithmic Pricing": ["Federal Competition and Consumer Protection Commission"],
    "Global Coal Combustion": ["Federal Ministry of Environment"],
    "Gig Economy Platforms": ["Federal Ministry of Labour and Employment"],
    "Big Tech Platform Monopoly": ["Federal Competition and Consumer Protection Commission"],
    "Bitcoin Proof-of-Work": ["Central Bank of Nigeria", "Securities and Exchange Commission"],
    "Commercial Real Estate Urban Hollowing": ["Federal Ministry of Works and Housing"],
  }
},

"Rwanda": {
  region: "Africa",
  domains: {
    "Tobacco": ["Rwanda Food and Drugs Authority"],
    "Ultra-Processed Food": ["Rwanda Food and Drugs Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Animal Resources"],
    "Water Privatization": ["Water and Sanitation Corporation"],
    "Industrial Monoculture": ["Ministry of Agriculture and Animal Resources"],
    "Aviation Emissions": ["Rwanda Civil Aviation Authority"],
    "Algorithmic Pricing": ["Rwanda Inspectorate, Competition and Consumer Protection Authority"],
    "Gig Economy Platforms": ["Ministry of Public Service and Labour"],
  }
},

"São Tomé and Príncipe": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Global Fisheries": ["Directorate of Fisheries"],
    "Water Privatization": ["Water and Electricity Company"],
    "Palm Oil Deforestation": ["Ministry of Infrastructure, Natural Resources and Environment"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Senegal": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Social Action"],
    "Ultra-Processed Food": ["Ministry of Health and Social Action"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Equipment"],
    "Oil & Gas Extraction": ["Petrosen (national petroleum company)"],
    "Global Fisheries": ["Ministry of Fisheries and Maritime Economy"],
    "Water Privatization": ["National Water Company of Senegal"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Equipment"],
    "Aviation Emissions": ["National Civil Aviation and Meteorology Agency"],
    "Arms Exports": ["Ministry of Armed Forces"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Small and Medium Industries"],
  }
},

"Seychelles": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Seychelles Fishing Authority"],
    "Water Privatization": ["Public Utilities Corporation"],
    "Aviation Emissions": ["Seychelles Civil Aviation Authority"],
    "Commercial Gambling": ["Seychelles Gaming Regulatory Authority (planned)"],
  }
},

"Sierra Leone": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Sanitation"],
    "Ultra-Processed Food": ["Ministry of Health and Sanitation"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food Security"],
    "Global Fisheries": ["Ministry of Fisheries and Marine Resources"],
    "Water Privatization": ["Guma Valley Water Company"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Sierra Leone Civil Aviation Authority"],
  }
},

"Somalia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health and Human Services"],
    "Ultra-Processed Food": ["Ministry of Health and Human Services"],
    "Topsoil Erosion": ["Ministry of Agriculture and Irrigation"],
    "Global Fisheries": ["Ministry of Fisheries and Marine Resources"],
    "Water Privatization": ["Ministry of Energy and Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Somali Civil Aviation Authority"],
  }
},

"South Africa": {
  region: "Africa",
  domains: {
    "Tobacco": ["Department of Health", "South African Health Products Regulatory Authority"],
    "Ultra-Processed Food": ["Department of Health", "South African Health Products Regulatory Authority"],
    "Topsoil Erosion": ["Department of Agriculture, Land Reform and Rural Development"],
    "Oil & Gas Extraction": ["Petroleum Agency South Africa"],
    "Global Coal Combustion": ["Department of Mineral Resources and Energy"],
    "Water Privatization": ["Department of Water and Sanitation", "Water Research Commission"],
    "Global Fisheries": ["Department of Forestry, Fisheries and the Environment"],
    "Industrial Monoculture": ["Department of Agriculture, Land Reform and Rural Development"],
    "Forever Chemicals (PFAS)": ["Department of Forestry, Fisheries and the Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Forestry, Fisheries and the Environment"],
    "Cement (Calcination Floor)": ["Department of Mineral Resources and Energy"],
    "Arms Exports": ["National Conventional Arms Control Committee", "Department of Defence"],
    "Aviation Emissions": ["South African Civil Aviation Authority"],
    "Opioid Ecosystem": ["South African Health Products Regulatory Authority"],
    "Commercial Gambling": ["National Gambling Board"],
    "Algorithmic Pricing": ["Competition Commission South Africa"],
    "Gig Economy Platforms": ["Department of Employment and Labour"],
    "Big Tech Platform Monopoly": ["Competition Commission South Africa"],
    "Bitcoin Proof-of-Work": ["South African Reserve Bank", "Financial Sector Conduct Authority"],
    "Commercial Real Estate Urban Hollowing": ["Department of Public Works and Infrastructure"],
    "Nuclear Fission": ["National Nuclear Regulator", "South African Nuclear Energy Corporation"],
    "Student Loan Securitization": ["National Student Financial Aid Scheme"],
    "Pharmacy Benefit Managers": ["Council for Medical Schemes"],
    "Weapons of Mass Destruction Capability Diffusion": ["South African Non-Proliferation Council"],
  }
},

"South Sudan": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food Security"],
    "Oil & Gas Extraction": ["Ministry of Petroleum", "Nile Petroleum Corporation"],
    "Water Privatization": ["Ministry of Water Resources and Irrigation"],
    "Arms Exports": ["Ministry of Defence and Veterans Affairs"],
    "Aviation Emissions": ["South Sudan Civil Aviation Authority"],
  }
},

"Sudan": {
  region: "Africa",
  domains: {
    "Tobacco": ["Federal Ministry of Health"],
    "Ultra-Processed Food": ["Federal Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Natural Resources"],
    "Oil & Gas Extraction": ["Ministry of Energy and Mining", "Sudanese Petroleum Corporation"],
    "Water Privatization": ["Ministry of Irrigation and Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Sudan Civil Aviation Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture and Natural Resources"],
  }
},

"Tanzania": {
  region: "Africa",
  domains: {
    "Tobacco": ["Tobacco Industry Act Enforcement Authority", "Ministry of Health"],
    "Ultra-Processed Food": ["Tanzania Food and Drugs Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Energy and Water Utilities Regulatory Authority"],
    "Global Fisheries": ["Ministry of Livestock and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Arms Exports": ["Ministry of Defence and National Service"],
    "Aviation Emissions": ["Tanzania Civil Aviation Authority"],
    "Opioid Ecosystem": ["Tanzania Food and Drugs Authority"],
    "Oil & Gas Extraction": ["Tanzania Petroleum Development Corporation"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Minerals"],
  }
},

"Togo": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Livestock and Rural Development"],
    "Water Privatization": ["Togolese Water Company"],
    "Global Fisheries": ["Ministry of Agriculture, Livestock and Rural Development"],
    "Cement (Calcination Floor)": ["Ministry of Industry"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
  }
},

"Tunisia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health", "National Agency for Food Safety"],
    "Topsoil Erosion": ["Ministry of Agriculture, Water Resources and Fisheries"],
    "Oil & Gas Extraction": ["National Company for Oil Activities"],
    "Water Privatization": ["National Water Distribution Utility"],
    "Global Fisheries": ["Ministry of Agriculture, Water Resources and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture, Water Resources and Fisheries"],
    "Forever Chemicals (PFAS)": ["Ministry of Local Affairs and Environment"],
    "Cement (Calcination Floor)": ["Ministry of Industry, Mines and Energy"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["Ministry of Social Affairs"],
  }
},

"Uganda": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health", "National Drug Authority"],
    "Ultra-Processed Food": ["National Drug Authority", "Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Animal Industry and Fisheries"],
    "Oil & Gas Extraction": ["Petroleum Authority of Uganda"],
    "Water Privatization": ["National Water and Sewerage Corporation"],
    "Global Fisheries": ["Ministry of Agriculture, Animal Industry and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture, Animal Industry and Fisheries"],
    "Arms Exports": ["Ministry of Defence and Veteran Affairs"],
    "Aviation Emissions": ["Uganda Civil Aviation Authority"],
  }
},

"Zambia": {
  region: "Africa",
  domains: {
    "Tobacco": ["Ministry of Health", "Zambia Medicines Regulatory Authority"],
    "Ultra-Processed Food": ["Zambia Bureau of Standards", "Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["National Water Supply and Sanitation Council"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Mines and Minerals Development"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Zambia Civil Aviation Authority"],
    "Algorithmic Pricing": ["Competition and Consumer Protection Commission"],
  }
},

"Zimbabwe": {
  region: "Africa",
  domains: {
    "Tobacco": ["Tobacco Industry and Marketing Board", "Ministry of Health and Child Care"],
    "Ultra-Processed Food": ["Ministry of Health and Child Care"],
    "Topsoil Erosion": ["Ministry of Lands, Agriculture, Fisheries, Water and Rural Development"],
    "Water Privatization": ["Zimbabwe National Water Authority"],
    "Industrial Monoculture": ["Ministry of Lands, Agriculture, Fisheries, Water and Rural Development"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Zimbabwe"],
    "Global Coal Combustion": ["Ministry of Energy and Power Development"],
    "Opioid Ecosystem": ["Medicines Control Authority of Zimbabwe"],
  }
},

// ═══════════════════════════════════════════════════════════════
// ASIA — 48 countries
// ═══════════════════════════════════════════════════════════════

"Afghanistan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Irrigation and Livestock"],
    "Water Privatization": ["Ministry of Energy and Water"],
    "Opioid Ecosystem": ["Ministry of Counter Narcotics", "Ministry of Public Health"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Afghanistan Civil Aviation Authority"],
  }
},

"Armenia": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health", "Food Safety Inspection Body"],
    "Topsoil Erosion": ["Ministry of Economy"],
    "Water Privatization": ["Public Services Regulatory Commission"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["General Department of Civil Aviation"],
    "Algorithmic Pricing": ["State Commission for the Protection of Economic Competition"],
    "Nuclear Fission": ["Armenian Nuclear Regulatory Authority"],
  }
},

"Azerbaijan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Food Safety Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["State Oil Company of the Azerbaijan Republic", "Ministry of Energy"],
    "Water Privatization": ["Azersu (state water utility)"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["State Civil Aviation Administration"],
    "Algorithmic Pricing": ["State Service for Antimonopoly Policy and Consumer Rights Protection"],
  }
},

"Bangladesh": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health and Family Welfare", "National Tobacco Control Cell"],
    "Ultra-Processed Food": ["Bangladesh Food Safety Authority", "Ministry of Food"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Dhaka Water Supply and Sewerage Authority", "Ministry of Water Resources"],
    "Global Fisheries": ["Department of Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Cement (Calcination Floor)": ["Department of Environment"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Bangladesh"],
    "Opioid Ecosystem": ["Department of Narcotics Control"],
    "Gig Economy Platforms": ["Ministry of Labour and Employment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Environment"],
    "Global Coal Combustion": ["Ministry of Power, Energy and Mineral Resources"],
    "Pharmacy Benefit Managers": ["Directorate General of Drug Administration"],
  }
},

"Bhutan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Bhutan Food and Drug Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Water Privatization": ["Ministry of Energy and Natural Resources"],
    "Aviation Emissions": ["Bhutan Civil Aviation Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
  }
},

"Brunei": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Oil & Gas Extraction": ["Ministry of Energy", "Brunei National Petroleum Company"],
    "Global Fisheries": ["Department of Fisheries"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Water Privatization": ["Public Works Department"],
  }
},

"Cambodia": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health", "Ministry of Commerce"],
    "Topsoil Erosion": ["Ministry of Agriculture, Forestry and Fisheries"],
    "Water Privatization": ["Ministry of Industry, Science, Technology and Innovation"],
    "Global Fisheries": ["Fisheries Administration"],
    "Palm Oil Deforestation": ["Ministry of Agriculture, Forestry and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture, Forestry and Fisheries"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["State Secretariat of Civil Aviation"],
    "Commercial Gambling": ["Ministry of Economy and Finance"],
    "Gig Economy Platforms": ["Ministry of Labour and Vocational Training"],
  }
},

"China": {
  region: "Asia",
  domains: {
    "Tobacco": ["State Tobacco Monopoly Administration", "National Health Commission"],
    "Ultra-Processed Food": ["State Administration for Market Regulation", "National Health Commission"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Affairs"],
    "Oil & Gas Extraction": ["National Energy Administration", "China National Petroleum Corporation", "China Petrochemical Corporation", "China National Offshore Oil Corporation"],
    "Global Coal Combustion": ["National Energy Administration", "Ministry of Ecology and Environment"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Information Technology", "Ministry of Ecology and Environment"],
    "Water Privatization": ["Ministry of Water Resources"],
    "Forever Chemicals (PFAS)": ["Ministry of Ecology and Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Ecology and Environment"],
    "Global Fisheries": ["Ministry of Agriculture and Rural Affairs", "Bureau of Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Affairs"],
    "Palm Oil Deforestation": ["State Forestry and Grassland Administration"],
    "Arms Exports": ["State Administration for Science, Technology and Industry for National Defence", "Central Military Commission"],
    "Weapons of Mass Destruction Capability Diffusion": ["China Atomic Energy Authority", "Ministry of Foreign Affairs"],
    "Orbital Debris (Kessler Ceiling)": ["China National Space Administration"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of Agriculture and Rural Affairs", "Ministry of Ecology and Environment"],
    "Aviation Emissions": ["Civil Aviation Administration of China"],
    "Opioid Ecosystem": ["National Medical Products Administration", "National Narcotics Control Commission"],
    "Commercial Gambling": ["Ministry of Public Security (gambling is illegal except state lottery)"],
    "Algorithmic Pricing": ["State Administration for Market Regulation", "Anti-Monopoly Bureau"],
    "Big Tech Platform Monopoly": ["State Administration for Market Regulation", "Cyberspace Administration of China"],
    "Bitcoin Proof-of-Work": ["People's Bank of China (cryptocurrency transactions banned)"],
    "Gig Economy Platforms": ["Ministry of Human Resources and Social Security"],
    "Nuclear Fission": ["National Nuclear Safety Administration", "China Atomic Energy Authority"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Housing and Urban-Rural Development"],
    "Oil & Gas Extraction": ["National Energy Administration"],
    "Deep-Sea Mining (Abyssal Floor)": ["China Ocean Mineral Resources Research and Development Association", "Ministry of Natural Resources"],
    "Student Loan Securitization": ["Ministry of Education", "China Banking and Insurance Regulatory Commission"],
    "Pharmacy Benefit Managers": ["National Healthcare Security Administration"],
    "Proof of Stake Protocols": ["People's Bank of China"],
  }
},

"Georgia": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Internally Displaced Persons, Labour, Health and Social Affairs"],
    "Ultra-Processed Food": ["National Food Agency"],
    "Topsoil Erosion": ["Ministry of Environmental Protection and Agriculture"],
    "Water Privatization": ["Georgian National Energy and Water Supply Regulatory Commission"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Georgian Civil Aviation Agency"],
    "Algorithmic Pricing": ["Georgian National Competition Agency"],
  }
},

"India": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health and Family Welfare", "Central Board of Indirect Taxes and Customs"],
    "Ultra-Processed Food": ["Food Safety and Standards Authority of India", "Ministry of Health and Family Welfare"],
    "Topsoil Erosion": ["Ministry of Agriculture and Farmers Welfare"],
    "Oil & Gas Extraction": ["Ministry of Petroleum and Natural Gas", "Oil and Natural Gas Corporation", "Directorate General of Hydrocarbons"],
    "Global Coal Combustion": ["Ministry of Coal", "Coal India Limited", "Central Electricity Authority"],
    "Cement (Calcination Floor)": ["Ministry of Commerce and Industry", "Central Pollution Control Board"],
    "Water Privatization": ["Ministry of Jal Shakti (Water)", "Central Water Commission", "Central Ground Water Board"],
    "Forever Chemicals (PFAS)": ["Central Pollution Control Board"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Central Pollution Control Board", "Ministry of Environment, Forest and Climate Change"],
    "Global Fisheries": ["Department of Fisheries", "Ministry of Fisheries, Animal Husbandry and Dairying"],
    "Industrial Monoculture": ["Ministry of Agriculture and Farmers Welfare"],
    "Palm Oil Deforestation": ["Ministry of Environment, Forest and Climate Change"],
    "Arms Exports": ["Ministry of Defence", "Defence Research and Development Organisation"],
    "Weapons of Mass Destruction Capability Diffusion": ["Department of Atomic Energy", "Defence Research and Development Organisation"],
    "Orbital Debris (Kessler Ceiling)": ["Indian Space Research Organisation"],
    "Gene Drives (Ecological Ratchet)": ["Department of Biotechnology", "Genetic Engineering Appraisal Committee"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Opioid Ecosystem": ["Central Bureau of Narcotics", "Narcotics Control Bureau", "Central Drugs Standard Control Organisation"],
    "Commercial Gambling": ["State governments (jurisdiction varies by state)"],
    "Algorithmic Pricing": ["Competition Commission of India"],
    "Big Tech Platform Monopoly": ["Competition Commission of India", "Ministry of Electronics and Information Technology"],
    "Bitcoin Proof-of-Work": ["Reserve Bank of India", "Securities and Exchange Board of India"],
    "Gig Economy Platforms": ["Ministry of Labour and Employment", "National Industrial Tribunal"],
    "Nuclear Fission": ["Atomic Energy Regulatory Board", "Department of Atomic Energy"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Housing and Urban Affairs"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Earth Sciences", "National Institute of Ocean Technology"],
    "Student Loan Securitization": ["Reserve Bank of India", "Ministry of Education"],
    "Pharmacy Benefit Managers": ["National Pharmaceutical Pricing Authority", "Central Drugs Standard Control Organisation"],
    "Proof of Stake Protocols": ["Reserve Bank of India", "Securities and Exchange Board of India"],
  }
},

"Indonesia": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health", "National Agency of Drug and Food Control"],
    "Ultra-Processed Food": ["National Agency of Drug and Food Control"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Energy and Mineral Resources", "Special Task Force for Upstream Oil and Gas"],
    "Global Coal Combustion": ["Ministry of Energy and Mineral Resources"],
    "Cement (Calcination Floor)": ["Ministry of Industry"],
    "Water Privatization": ["Ministry of Public Works and Housing"],
    "Forever Chemicals (PFAS)": ["Ministry of Environment and Forestry"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Forestry"],
    "Global Fisheries": ["Ministry of Marine Affairs and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Palm Oil Deforestation": ["Ministry of Environment and Forestry", "Indonesian Sustainable Palm Oil Certification Body"],
    "Arms Exports": ["Ministry of Defence"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of Environment and Forestry"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Opioid Ecosystem": ["National Narcotics Board"],
    "Commercial Gambling": ["Ministry of Communication and Informatics (online gambling is illegal)"],
    "Algorithmic Pricing": ["Indonesia Competition Commission"],
    "Big Tech Platform Monopoly": ["Indonesia Competition Commission"],
    "Bitcoin Proof-of-Work": ["Commodity Futures Trading Regulatory Agency"],
    "Gig Economy Platforms": ["Ministry of Manpower"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Energy and Mineral Resources"],
    "Nuclear Fission": ["Nuclear Energy Regulatory Agency"],
    "Orbital Debris (Kessler Ceiling)": ["National Institute of Aeronautics and Space"],
  }
},

"Japan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health, Labour and Welfare", "Ministry of Finance (tobacco tax)"],
    "Ultra-Processed Food": ["Ministry of Health, Labour and Welfare", "Consumer Affairs Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture, Forestry and Fisheries"],
    "Oil & Gas Extraction": ["Agency for Natural Resources and Energy", "Japan Oil, Gas and Metals National Corporation"],
    "Global Coal Combustion": ["Agency for Natural Resources and Energy", "Ministry of the Environment"],
    "Cement (Calcination Floor)": ["Ministry of Economy, Trade and Industry"],
    "Water Privatization": ["Ministry of Health, Labour and Welfare", "Ministry of Land, Infrastructure, Transport and Tourism"],
    "Forever Chemicals (PFAS)": ["Ministry of the Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of the Environment"],
    "Global Fisheries": ["Fisheries Agency"],
    "Arms Exports": ["Ministry of Defence", "Ministry of Economy, Trade and Industry (export controls)"],
    "Weapons of Mass Destruction Capability Diffusion": ["Nuclear Regulation Authority", "Ministry of Foreign Affairs"],
    "Orbital Debris (Kessler Ceiling)": ["Japan Aerospace Exploration Agency"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of the Environment", "Ministry of Agriculture, Forestry and Fisheries"],
    "Aviation Emissions": ["Ministry of Land, Infrastructure, Transport and Tourism", "Civil Aviation Bureau"],
    "Opioid Ecosystem": ["Ministry of Health, Labour and Welfare"],
    "Commercial Gambling": ["Casino Administration Committee"],
    "Algorithmic Pricing": ["Japan Fair Trade Commission"],
    "Big Tech Platform Monopoly": ["Japan Fair Trade Commission", "Ministry of Economy, Trade and Industry"],
    "Bitcoin Proof-of-Work": ["Financial Services Agency"],
    "Gig Economy Platforms": ["Ministry of Health, Labour and Welfare"],
    "Nuclear Fission": ["Nuclear Regulation Authority"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Land, Infrastructure, Transport and Tourism"],
    "Deep-Sea Mining (Abyssal Floor)": ["Japan Oil, Gas and Metals National Corporation", "Agency for Natural Resources and Energy"],
    "Student Loan Securitization": ["Japan Student Services Organization"],
    "Pharmacy Benefit Managers": ["Ministry of Health, Labour and Welfare"],
    "Proof of Stake Protocols": ["Financial Services Agency"],
  }
},

"Kazakhstan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Energy", "KazMunayGas (national oil company)"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Water Privatization": ["Ministry of Ecology and Natural Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Committee"],
    "Nuclear Fission": ["Ministry of Energy", "Kazatomprom (national nuclear company)"],
    "Weapons of Mass Destruction Capability Diffusion": ["Ministry of Foreign Affairs"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Infrastructural Development"],
    "Algorithmic Pricing": ["Agency for Protection and Development of Competition"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Protection of the Population"],
  }
},

"Kyrgyzstan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Department of Water Supply and Sanitation"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
  }
},

"Laos": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Forestry"],
    "Water Privatization": ["Ministry of Public Works and Transport"],
    "Palm Oil Deforestation": ["Ministry of Agriculture and Forestry"],
    "Industrial Monoculture": ["Ministry of Agriculture and Forestry"],
    "Global Fisheries": ["Department of Livestock and Fisheries"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Energy and Mines"],
  }
},

"Malaysia": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health", "Food Safety and Quality Division"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food Security"],
    "Oil & Gas Extraction": ["Petronas (national petroleum company)", "Malaysia Petroleum Management"],
    "Global Coal Combustion": ["Energy Commission"],
    "Cement (Calcination Floor)": ["Ministry of International Trade and Industry"],
    "Water Privatization": ["National Water Services Commission"],
    "Forever Chemicals (PFAS)": ["Department of Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Environment"],
    "Global Fisheries": ["Department of Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Food Security"],
    "Palm Oil Deforestation": ["Malaysian Palm Oil Board", "Malaysian Sustainable Palm Oil Certification Council"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Malaysia"],
    "Opioid Ecosystem": ["Ministry of Health", "National Anti-Drugs Agency"],
    "Commercial Gambling": ["Ministry of Finance (licensing)"],
    "Algorithmic Pricing": ["Malaysia Competition Commission"],
    "Big Tech Platform Monopoly": ["Malaysia Competition Commission"],
    "Bitcoin Proof-of-Work": ["Securities Commission Malaysia"],
    "Gig Economy Platforms": ["Ministry of Human Resources"],
    "Nuclear Fission": ["Atomic Energy Licensing Board"],
    "Orbital Debris (Kessler Ceiling)": ["Malaysian Space Agency"],
  }
},

"Maldives": {
  region: "Asia",
  domains: {
    "Tobacco": ["Health Protection Agency"],
    "Ultra-Processed Food": ["Maldives Food and Drug Authority"],
    "Global Fisheries": ["Ministry of Fisheries, Marine Resources and Agriculture"],
    "Water Privatization": ["Male' Water and Sewerage Company"],
    "Aviation Emissions": ["Maldives Civil Aviation Authority"],
    "Topsoil Erosion": ["Ministry of Fisheries, Marine Resources and Agriculture"],
  }
},

"Mongolia": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Food, Agriculture and Light Industry"],
    "Global Coal Combustion": ["Ministry of Mining and Heavy Industry"],
    "Water Privatization": ["Ministry of Environment and Tourism"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Mongolia"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Mining and Heavy Industry"],
    "Industrial Monoculture": ["Ministry of Food, Agriculture and Light Industry"],
  }
},

"Myanmar": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Livestock and Irrigation"],
    "Oil & Gas Extraction": ["Ministry of Electricity and Energy", "Myanmar Oil and Gas Enterprise"],
    "Water Privatization": ["Ministry of Agriculture, Livestock and Irrigation"],
    "Global Fisheries": ["Department of Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture, Livestock and Irrigation"],
    "Palm Oil Deforestation": ["Ministry of Natural Resources and Environmental Conservation"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Opioid Ecosystem": ["Central Committee for Drug Abuse Control"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Natural Resources and Environmental Conservation"],
  }
},

"Nepal": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health and Population"],
    "Ultra-Processed Food": ["Department of Food Technology and Quality Control"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock Development"],
    "Water Privatization": ["Nepal Water Supply Corporation", "Department of Water Supply"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock Development"],
    "Aviation Emissions": ["Civil Aviation Authority of Nepal"],
    "Opioid Ecosystem": ["Department of Drug Administration"],
    "Arms Exports": ["Ministry of Defence"],
  }
},

"North Korea": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Weapons of Mass Destruction Capability Diffusion": ["State Affairs Commission (nuclear weapons program)"],
    "Nuclear Fission": ["General Bureau of Atomic Energy"],
    "Arms Exports": ["Second Economic Committee (arms production and export)"],
    "Water Privatization": ["Ministry of City Management"],
    "Global Coal Combustion": ["Ministry of Electric Power Industry"],
    "Aviation Emissions": ["General Administration of Civil Aviation"],
  }
},

"Pakistan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of National Health Services, Regulations and Coordination"],
    "Ultra-Processed Food": ["Pakistan Standards and Quality Control Authority", "Ministry of National Health Services, Regulations and Coordination"],
    "Topsoil Erosion": ["Ministry of National Food Security and Research"],
    "Oil & Gas Extraction": ["Ministry of Energy (Petroleum Division)", "Oil and Gas Development Company"],
    "Global Coal Combustion": ["Ministry of Energy (Power Division)"],
    "Cement (Calcination Floor)": ["Ministry of Industries and Production"],
    "Water Privatization": ["Ministry of Water Resources", "Water and Power Development Authority"],
    "Forever Chemicals (PFAS)": ["Pakistan Environmental Protection Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Pakistan Environmental Protection Agency"],
    "Global Fisheries": ["Ministry of Maritime Affairs"],
    "Industrial Monoculture": ["Ministry of National Food Security and Research"],
    "Arms Exports": ["Ministry of Defence Production"],
    "Weapons of Mass Destruction Capability Diffusion": ["Pakistan Atomic Energy Commission", "Strategic Plans Division"],
    "Aviation Emissions": ["Pakistan Civil Aviation Authority"],
    "Opioid Ecosystem": ["Anti-Narcotics Force", "Drug Regulatory Authority of Pakistan"],
    "Algorithmic Pricing": ["Competition Commission of Pakistan"],
    "Gig Economy Platforms": ["Ministry of Overseas Pakistanis and Human Resource Development"],
    "Nuclear Fission": ["Pakistan Nuclear Regulatory Authority", "Pakistan Atomic Energy Commission"],
    "Commercial Gambling": ["Federal Investigation Agency (gambling is illegal)"],
    "Bitcoin Proof-of-Work": ["State Bank of Pakistan"],
  }
},

"Philippines": {
  region: "Asia",
  domains: {
    "Tobacco": ["Department of Health", "Food and Drug Administration"],
    "Ultra-Processed Food": ["Food and Drug Administration", "Department of Health"],
    "Topsoil Erosion": ["Department of Agriculture"],
    "Oil & Gas Extraction": ["Department of Energy"],
    "Global Coal Combustion": ["Department of Energy"],
    "Cement (Calcination Floor)": ["Department of Trade and Industry"],
    "Water Privatization": ["Metropolitan Waterworks and Sewerage System", "National Water Resources Board"],
    "Global Fisheries": ["Bureau of Fisheries and Aquatic Resources"],
    "Industrial Monoculture": ["Department of Agriculture"],
    "Palm Oil Deforestation": ["Department of Environment and Natural Resources"],
    "Arms Exports": ["Department of National Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of the Philippines"],
    "Opioid Ecosystem": ["Dangerous Drugs Board", "Philippine Drug Enforcement Agency"],
    "Commercial Gambling": ["Philippine Amusement and Gaming Corporation"],
    "Algorithmic Pricing": ["Philippine Competition Commission"],
    "Big Tech Platform Monopoly": ["Philippine Competition Commission"],
    "Gig Economy Platforms": ["Department of Labor and Employment"],
    "Deep-Sea Mining (Abyssal Floor)": ["Mines and Geosciences Bureau"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Environment and Natural Resources"],
    "Bitcoin Proof-of-Work": ["Bangko Sentral ng Pilipinas (Central Bank of the Philippines)"],
  }
},

"Singapore": {
  region: "Asia",
  domains: {
    "Tobacco": ["Health Sciences Authority", "Ministry of Health"],
    "Ultra-Processed Food": ["Singapore Food Agency"],
    "Water Privatization": ["Public Utilities Board"],
    "Forever Chemicals (PFAS)": ["National Environment Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["National Environment Agency"],
    "Arms Exports": ["Ministry of Defence", "Singapore Police Force (Arms and Explosives Division)"],
    "Aviation Emissions": ["Civil Aviation Authority of Singapore"],
    "Opioid Ecosystem": ["Central Narcotics Bureau", "Health Sciences Authority"],
    "Commercial Gambling": ["Casino Regulatory Authority"],
    "Algorithmic Pricing": ["Competition and Consumer Commission of Singapore"],
    "Big Tech Platform Monopoly": ["Competition and Consumer Commission of Singapore", "Infocomm Media Development Authority"],
    "Bitcoin Proof-of-Work": ["Monetary Authority of Singapore"],
    "Gig Economy Platforms": ["Ministry of Manpower"],
    "Proof of Stake Protocols": ["Monetary Authority of Singapore"],
    "Pharmacy Benefit Managers": ["Ministry of Health"],
    "Global Fisheries": ["Singapore Food Agency"],
    "Orbital Debris (Kessler Ceiling)": ["Office for Space Technology and Industry"],
  }
},

"South Korea": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health and Welfare"],
    "Ultra-Processed Food": ["Ministry of Food and Drug Safety"],
    "Topsoil Erosion": ["Ministry of Agriculture, Food and Rural Affairs"],
    "Oil & Gas Extraction": ["Korea National Oil Corporation", "Ministry of Trade, Industry and Energy"],
    "Global Coal Combustion": ["Ministry of Trade, Industry and Energy"],
    "Cement (Calcination Floor)": ["Ministry of Trade, Industry and Energy", "Ministry of Environment"],
    "Water Privatization": ["Korea Water Resources Corporation"],
    "Forever Chemicals (PFAS)": ["Ministry of Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment", "National Institute of Chemical Safety"],
    "Global Fisheries": ["Ministry of Oceans and Fisheries"],
    "Arms Exports": ["Defence Acquisition Program Administration", "Ministry of National Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["Korea Institute of Nuclear Safety", "Ministry of Foreign Affairs"],
    "Orbital Debris (Kessler Ceiling)": ["Korea Aerospace Research Institute"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of Environment", "Rural Development Administration"],
    "Aviation Emissions": ["Ministry of Land, Infrastructure and Transport"],
    "Opioid Ecosystem": ["Ministry of Food and Drug Safety"],
    "Algorithmic Pricing": ["Korea Fair Trade Commission"],
    "Big Tech Platform Monopoly": ["Korea Fair Trade Commission", "Korea Communications Commission"],
    "Bitcoin Proof-of-Work": ["Financial Services Commission", "Financial Supervisory Service"],
    "Gig Economy Platforms": ["Ministry of Employment and Labour"],
    "Nuclear Fission": ["Nuclear Safety and Security Commission"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Land, Infrastructure and Transport"],
    "Deep-Sea Mining (Abyssal Floor)": ["Korea Institute of Ocean Science and Technology"],
    "Pharmacy Benefit Managers": ["Health Insurance Review and Assessment Service"],
    "Proof of Stake Protocols": ["Financial Services Commission"],
  }
},

"Sri Lanka": {
  region: "Asia",
  domains: {
    "Tobacco": ["National Authority on Tobacco and Alcohol"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["National Water Supply and Drainage Board"],
    "Global Fisheries": ["Department of Fisheries and Aquatic Resources"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Central Environmental Authority"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Sri Lanka"],
    "Opioid Ecosystem": ["National Dangerous Drugs Control Board"],
    "Algorithmic Pricing": ["Consumer Affairs Authority"],
    "Gig Economy Platforms": ["Ministry of Labour"],
    "Commercial Gambling": ["National Lotteries Board"],
  }
},

"Tajikistan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health and Social Protection"],
    "Ultra-Processed Food": ["Ministry of Health and Social Protection"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Ministry of Energy and Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
  }
},

"Thailand": {
  region: "Asia",
  domains: {
    "Tobacco": ["Department of Disease Control", "Thai Health Promotion Foundation"],
    "Ultra-Processed Food": ["Food and Drug Administration", "Ministry of Public Health"],
    "Topsoil Erosion": ["Department of Land Development", "Ministry of Agriculture and Cooperatives"],
    "Oil & Gas Extraction": ["Department of Mineral Fuels", "PTT Public Company Limited (state energy company)"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Cement (Calcination Floor)": ["Ministry of Industry"],
    "Water Privatization": ["Metropolitan Waterworks Authority", "Provincial Waterworks Authority"],
    "Forever Chemicals (PFAS)": ["Pollution Control Department"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Pollution Control Department"],
    "Global Fisheries": ["Department of Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Cooperatives"],
    "Palm Oil Deforestation": ["Royal Forest Department"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Thailand"],
    "Opioid Ecosystem": ["Office of the Narcotics Control Board", "Food and Drug Administration"],
    "Commercial Gambling": ["Ministry of Finance (national lottery only; other gambling mostly illegal)"],
    "Algorithmic Pricing": ["Office of Trade Competition Commission"],
    "Big Tech Platform Monopoly": ["Office of Trade Competition Commission"],
    "Bitcoin Proof-of-Work": ["Securities and Exchange Commission Thailand"],
    "Gig Economy Platforms": ["Ministry of Labour"],
    "Nuclear Fission": ["Office of Atoms for Peace"],
    "Pharmacy Benefit Managers": ["National Health Security Office"],
  }
},

"Timor-Leste": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Fisheries"],
    "Oil & Gas Extraction": ["National Petroleum and Minerals Authority"],
    "Global Fisheries": ["Ministry of Agriculture and Fisheries"],
    "Water Privatization": ["Ministry of Public Works"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Turkmenistan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health and Medical Industry"],
    "Ultra-Processed Food": ["Ministry of Health and Medical Industry"],
    "Topsoil Erosion": ["Ministry of Agriculture and Environmental Protection"],
    "Oil & Gas Extraction": ["State Concern Turkmengaz", "State Concern Turkmennebit"],
    "Water Privatization": ["Ministry of Agriculture and Environmental Protection"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
  }
},

"Uzbekistan": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Uzbekneftegaz (national oil and gas company)"],
    "Water Privatization": ["Ministry of Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["State Inspectorate for Supervision of Flight Safety"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Nuclear Fission": ["State Committee on Industrial Safety"],
    "Algorithmic Pricing": ["Antimonopoly Committee"],
  }
},

"Vietnam": {
  region: "Asia",
  domains: {
    "Tobacco": ["Ministry of Health", "Vietnam Tobacco Association"],
    "Ultra-Processed Food": ["Ministry of Health", "Vietnam Food Administration"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Oil & Gas Extraction": ["PetroVietnam (state oil corporation)", "Ministry of Industry and Trade"],
    "Global Coal Combustion": ["Ministry of Industry and Trade", "Vietnam National Coal and Mineral Industries Group"],
    "Cement (Calcination Floor)": ["Ministry of Construction"],
    "Water Privatization": ["Ministry of Construction", "Ministry of Agriculture and Rural Development"],
    "Forever Chemicals (PFAS)": ["Ministry of Natural Resources and Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Natural Resources and Environment"],
    "Global Fisheries": ["Directorate of Fisheries", "Ministry of Agriculture and Rural Development"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Civil Aviation Authority of Vietnam"],
    "Opioid Ecosystem": ["Standing Office on Drug Control"],
    "Algorithmic Pricing": ["Vietnam Competition and Consumer Protection Authority"],
    "Big Tech Platform Monopoly": ["Vietnam Competition and Consumer Protection Authority", "Ministry of Information and Communications"],
    "Gig Economy Platforms": ["Ministry of Labour, Invalids and Social Affairs"],
    "Nuclear Fission": ["Vietnam Agency for Radiation and Nuclear Safety"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Natural Resources and Environment"],
    "Palm Oil Deforestation": ["Ministry of Agriculture and Rural Development"],
  }
},

// ═══════════════════════════════════════════════════════════════
// EUROPE — 44 countries
// ═══════════════════════════════════════════════════════════════

"Albania": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health and Social Protection"],
    "Ultra-Processed Food": ["National Food Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Water Privatization": ["Water Regulatory Authority"],
    "Oil & Gas Extraction": ["National Agency of Natural Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Albanian Civil Aviation Authority"],
    "Algorithmic Pricing": ["Albanian Competition Authority"],
  }
},

"Andorra": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Commercial Gambling": ["Andorran Gaming Control Board"],
  }
},

"Austria": {
  region: "Europe",
  domains: {
    "Tobacco": ["Federal Ministry of Social Affairs, Health, Care and Consumer Protection"],
    "Ultra-Processed Food": ["Austrian Agency for Health and Food Safety"],
    "Topsoil Erosion": ["Federal Ministry of Agriculture, Forestry, Regions and Water Management"],
    "Water Privatization": ["Federal Ministry of Agriculture, Forestry, Regions and Water Management"],
    "Global Coal Combustion": ["Federal Ministry for Climate Action, Environment, Energy, Mobility, Innovation and Technology"],
    "Cement (Calcination Floor)": ["Federal Ministry for Climate Action, Environment, Energy, Mobility, Innovation and Technology"],
    "Forever Chemicals (PFAS)": ["Federal Environment Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Federal Environment Agency"],
    "Arms Exports": ["Federal Ministry of Defence"],
    "Aviation Emissions": ["Austro Control (civil aviation authority)"],
    "Opioid Ecosystem": ["Federal Office for Safety in Health Care"],
    "Commercial Gambling": ["Federal Ministry of Finance"],
    "Algorithmic Pricing": ["Federal Competition Authority"],
    "Big Tech Platform Monopoly": ["Federal Competition Authority"],
    "Bitcoin Proof-of-Work": ["Financial Market Authority"],
    "Gig Economy Platforms": ["Federal Ministry of Labour and Economy"],
    "Nuclear Fission": ["Austria is nuclear-free by constitutional law (1978 referendum)"],
    "Pharmacy Benefit Managers": ["Main Association of Austrian Social Insurance Institutions"],
    "Proof of Stake Protocols": ["Financial Market Authority"],
    "Student Loan Securitization": ["Federal Ministry of Education, Science and Research"],
  }
},

"Belarus": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food"],
    "Oil & Gas Extraction": ["Belneftekhim (state petrochemical concern)"],
    "Water Privatization": ["Ministry of Housing and Communal Services"],
    "Arms Exports": ["State Authority for Military Industry", "Ministry of Defence"],
    "Aviation Emissions": ["Department of Aviation"],
    "Nuclear Fission": ["Gosatomnadzor (nuclear regulatory authority)"],
    "Industrial Monoculture": ["Ministry of Agriculture and Food"],
    "Forever Chemicals (PFAS)": ["Ministry of Natural Resources and Environmental Protection"],
  }
},

"Belgium": {
  region: "Europe",
  domains: {
    "Tobacco": ["Federal Public Service Health, Food Chain Safety and Environment"],
    "Ultra-Processed Food": ["Federal Agency for the Safety of the Food Chain"],
    "Topsoil Erosion": ["Regional agriculture departments (Flanders, Wallonia, Brussels)"],
    "Water Privatization": ["Regional water regulators (Flanders, Wallonia, Brussels)"],
    "Forever Chemicals (PFAS)": ["Federal Public Service Health, Food Chain Safety and Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Federal Public Service Health, Food Chain Safety and Environment"],
    "Arms Exports": ["Regional governments (arms export licensing is regionalized)"],
    "Aviation Emissions": ["Federal Public Service Mobility and Transport"],
    "Opioid Ecosystem": ["Federal Agency for Medicines and Health Products"],
    "Commercial Gambling": ["Belgian Gaming Commission"],
    "Algorithmic Pricing": ["Belgian Competition Authority"],
    "Big Tech Platform Monopoly": ["Belgian Competition Authority"],
    "Bitcoin Proof-of-Work": ["Financial Services and Markets Authority"],
    "Gig Economy Platforms": ["Federal Public Service Employment, Labour and Social Dialogue"],
    "Nuclear Fission": ["Federal Agency for Nuclear Control"],
    "Pharmacy Benefit Managers": ["National Institute for Health and Disability Insurance"],
    "Cement (Calcination Floor)": ["Federal Public Service Health, Food Chain Safety and Environment"],
    "Proof of Stake Protocols": ["Financial Services and Markets Authority"],
  }
},

"Bosnia and Herzegovina": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Civil Affairs (health sector)"],
    "Ultra-Processed Food": ["Food Safety Agency of Bosnia and Herzegovina"],
    "Topsoil Erosion": ["Entity-level agriculture ministries"],
    "Water Privatization": ["Entity-level water agencies"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Directorate of Civil Aviation"],
    "Algorithmic Pricing": ["Competition Council"],
  }
},

"Bulgaria": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Bulgarian Food Safety Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food"],
    "Water Privatization": ["Ministry of Regional Development and Public Works", "Energy and Water Regulatory Commission"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Arms Exports": ["Interministerial Commission for Export Control"],
    "Aviation Emissions": ["Directorate General Civil Aviation Administration"],
    "Nuclear Fission": ["Nuclear Regulatory Agency"],
    "Algorithmic Pricing": ["Commission on Protection of Competition"],
    "Cement (Calcination Floor)": ["Ministry of Environment and Water"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Policy"],
  }
},

"Croatia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Croatian Food Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Croatian Waters (state water management agency)"],
    "Global Fisheries": ["Ministry of Agriculture"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Croatian Civil Aviation Agency"],
    "Algorithmic Pricing": ["Croatian Competition Agency"],
    "Gig Economy Platforms": ["Ministry of Labour, Pension System, Family and Social Policy"],
    "Commercial Gambling": ["Ministry of Finance"],
  }
},

"Cyprus": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Rural Development and Environment"],
    "Water Privatization": ["Water Development Department"],
    "Global Fisheries": ["Department of Fisheries and Marine Research"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Algorithmic Pricing": ["Commission for the Protection of Competition"],
    "Commercial Gambling": ["National Betting Authority"],
    "Bitcoin Proof-of-Work": ["Cyprus Securities and Exchange Commission"],
  }
},

"Czech Republic": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Czech Agriculture and Food Inspection Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Global Coal Combustion": ["Ministry of Industry and Trade"],
    "Cement (Calcination Floor)": ["Ministry of the Environment"],
    "Water Privatization": ["Ministry of Agriculture", "Ministry of the Environment"],
    "Forever Chemicals (PFAS)": ["Czech Environmental Inspectorate"],
    "Arms Exports": ["Ministry of Industry and Trade (Licensing Office)"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Opioid Ecosystem": ["State Institute for Drug Control"],
    "Algorithmic Pricing": ["Office for the Protection of Competition"],
    "Big Tech Platform Monopoly": ["Office for the Protection of Competition"],
    "Nuclear Fission": ["State Office for Nuclear Safety"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Affairs"],
    "Bitcoin Proof-of-Work": ["Czech National Bank"],
    "Commercial Gambling": ["Ministry of Finance"],
  }
},

"Denmark": {
  region: "Europe",
  domains: {
    "Tobacco": ["Danish Health Authority"],
    "Ultra-Processed Food": ["Danish Veterinary and Food Administration"],
    "Topsoil Erosion": ["Ministry of Food, Agriculture and Fisheries"],
    "Water Privatization": ["Danish Environmental Protection Agency"],
    "Forever Chemicals (PFAS)": ["Danish Environmental Protection Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Danish Environmental Protection Agency"],
    "Global Fisheries": ["Ministry of Food, Agriculture and Fisheries"],
    "Arms Exports": ["Ministry of Foreign Affairs (export control)", "Danish Defence"],
    "Aviation Emissions": ["Danish Transport Authority"],
    "Opioid Ecosystem": ["Danish Medicines Agency"],
    "Algorithmic Pricing": ["Danish Competition and Consumer Authority"],
    "Big Tech Platform Monopoly": ["Danish Competition and Consumer Authority"],
    "Oil & Gas Extraction": ["Danish Energy Agency"],
    "Gig Economy Platforms": ["Danish Working Environment Authority"],
    "Pharmacy Benefit Managers": ["Danish Medicines Agency"],
    "Bitcoin Proof-of-Work": ["Danish Financial Supervisory Authority"],
    "Proof of Stake Protocols": ["Danish Financial Supervisory Authority"],
  }
},

"Estonia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Social Affairs (Health Department)"],
    "Ultra-Processed Food": ["Veterinary and Food Board"],
    "Topsoil Erosion": ["Ministry of Rural Affairs"],
    "Water Privatization": ["Environmental Board"],
    "Arms Exports": ["Strategic Goods Commission"],
    "Aviation Emissions": ["Estonian Civil Aviation Administration"],
    "Algorithmic Pricing": ["Estonian Competition Authority"],
    "Bitcoin Proof-of-Work": ["Financial Intelligence Unit"],
    "Gig Economy Platforms": ["Ministry of Social Affairs"],
    "Proof of Stake Protocols": ["Financial Intelligence Unit"],
  }
},

"Finland": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Social Affairs and Health"],
    "Ultra-Processed Food": ["Finnish Food Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Forestry"],
    "Water Privatization": ["Finnish Environment Institute"],
    "Forever Chemicals (PFAS)": ["Finnish Environment Institute"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Finnish Safety and Chemicals Agency"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Finnish Transport and Communications Agency"],
    "Opioid Ecosystem": ["Finnish Medicines Agency"],
    "Algorithmic Pricing": ["Finnish Competition and Consumer Authority"],
    "Nuclear Fission": ["Radiation and Nuclear Safety Authority"],
    "Gig Economy Platforms": ["Ministry of Economic Affairs and Employment"],
    "Pharmacy Benefit Managers": ["Social Insurance Institution of Finland"],
    "Bitcoin Proof-of-Work": ["Financial Supervisory Authority"],
  }
},

"France": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health and Prevention"],
    "Ultra-Processed Food": ["National Agency for Food, Environmental and Occupational Health Safety"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food Sovereignty"],
    "Oil & Gas Extraction": ["Ministry of Energy Transition"],
    "Global Coal Combustion": ["Ministry of Energy Transition"],
    "Cement (Calcination Floor)": ["Ministry of Ecological Transition"],
    "Water Privatization": ["French Office for Biodiversity", "Water agencies (six river basin agencies)"],
    "Forever Chemicals (PFAS)": ["National Agency for Food, Environmental and Occupational Health Safety", "Ministry of Ecological Transition"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["National Agency for Food, Environmental and Occupational Health Safety"],
    "Global Fisheries": ["Ministry of Agriculture and Food Sovereignty"],
    "Arms Exports": ["Ministry of Armed Forces", "Secretariat General for National Defence and Security"],
    "Weapons of Mass Destruction Capability Diffusion": ["Atomic Energy and Alternative Energies Commission", "Ministry of Foreign Affairs"],
    "Orbital Debris (Kessler Ceiling)": ["National Centre for Space Studies"],
    "Gene Drives (Ecological Ratchet)": ["High Council for Biotechnology"],
    "Aviation Emissions": ["Directorate General for Civil Aviation"],
    "Opioid Ecosystem": ["National Agency for the Safety of Medicines and Health Products"],
    "Commercial Gambling": ["National Gambling Authority"],
    "Algorithmic Pricing": ["French Competition Authority"],
    "Big Tech Platform Monopoly": ["French Competition Authority", "Electronic Communications, Postal and Print Distribution Regulatory Authority"],
    "Bitcoin Proof-of-Work": ["Financial Markets Authority"],
    "Gig Economy Platforms": ["Ministry of Labour, Full Employment and Integration"],
    "Nuclear Fission": ["Nuclear Safety Authority", "Atomic Energy and Alternative Energies Commission"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Ecological Transition (Housing)"],
    "Deep-Sea Mining (Abyssal Floor)": ["French Research Institute for Exploitation of the Sea"],
    "Student Loan Securitization": ["Ministry of Higher Education and Research"],
    "Pharmacy Benefit Managers": ["National Health Insurance Fund"],
    "Proof of Stake Protocols": ["Financial Markets Authority"],
    "Palm Oil Deforestation": ["Ministry of Ecological Transition"],
  }
},

"Germany": {
  region: "Europe",
  domains: {
    "Tobacco": ["Federal Ministry of Health"],
    "Ultra-Processed Food": ["Federal Office for Consumer Protection and Food Safety"],
    "Topsoil Erosion": ["Federal Ministry of Food and Agriculture"],
    "Oil & Gas Extraction": ["Federal Ministry for Economic Affairs and Climate Action"],
    "Global Coal Combustion": ["Federal Ministry for Economic Affairs and Climate Action"],
    "Cement (Calcination Floor)": ["Federal Ministry for the Environment, Nature Conservation, Nuclear Safety and Consumer Protection"],
    "Water Privatization": ["Federal Ministry for the Environment, Nature Conservation, Nuclear Safety and Consumer Protection"],
    "Forever Chemicals (PFAS)": ["Federal Environment Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Federal Environment Agency"],
    "Arms Exports": ["Federal Ministry for Economic Affairs and Climate Action (Federal Security Council)"],
    "Weapons of Mass Destruction Capability Diffusion": ["Federal Office for Economic Affairs and Export Control"],
    "Orbital Debris (Kessler Ceiling)": ["German Aerospace Center"],
    "Gene Drives (Ecological Ratchet)": ["Federal Office for Consumer Protection and Food Safety"],
    "Aviation Emissions": ["Federal Aviation Office"],
    "Opioid Ecosystem": ["Federal Institute for Drugs and Medical Devices"],
    "Commercial Gambling": ["Joint Gambling Authority of the Federal States"],
    "Algorithmic Pricing": ["Federal Cartel Office"],
    "Big Tech Platform Monopoly": ["Federal Cartel Office"],
    "Bitcoin Proof-of-Work": ["Federal Financial Supervisory Authority"],
    "Gig Economy Platforms": ["Federal Ministry of Labour and Social Affairs"],
    "Nuclear Fission": ["Federal Ministry for the Environment (nuclear phase-out completed 2023)"],
    "Commercial Real Estate Urban Hollowing": ["Federal Ministry of Housing, Urban Development and Building"],
    "Student Loan Securitization": ["Federal Ministry of Education and Research (BAföG system)"],
    "Pharmacy Benefit Managers": ["Federal Joint Committee (health insurance)"],
    "Proof of Stake Protocols": ["Federal Financial Supervisory Authority"],
    "Global Fisheries": ["Federal Ministry of Food and Agriculture"],
    "Industrial Monoculture": ["Federal Ministry of Food and Agriculture"],
  }
},

"Greece": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Hellenic Food Authority"],
    "Topsoil Erosion": ["Ministry of Rural Development and Food"],
    "Water Privatization": ["Athens Water Supply and Sewerage Company", "Thessaloniki Water Supply and Sewerage Company"],
    "Global Fisheries": ["Ministry of Rural Development and Food"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Hellenic Civil Aviation Authority"],
    "Algorithmic Pricing": ["Hellenic Competition Commission"],
    "Commercial Gambling": ["Hellenic Gaming Commission"],
    "Bitcoin Proof-of-Work": ["Hellenic Capital Market Commission"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Security"],
    "Oil & Gas Extraction": ["Hellenic Hydrocarbons and Energy Resources Management Company"],
    "Cement (Calcination Floor)": ["Ministry of Environment and Energy"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Environment and Energy"],
  }
},

"Hungary": {
  region: "Europe",
  domains: {
    "Tobacco": ["National Public Health Center"],
    "Ultra-Processed Food": ["National Food Chain Safety Office"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Hungarian Energy and Public Utility Regulatory Authority"],
    "Nuclear Fission": ["Hungarian Atomic Energy Authority"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Ministry of Transport (civil aviation)"],
    "Algorithmic Pricing": ["Hungarian Competition Authority"],
    "Opioid Ecosystem": ["National Institute of Pharmacy and Nutrition"],
    "Commercial Gambling": ["Gambling Supervision Authority"],
    "Gig Economy Platforms": ["Ministry of National Economy"],
    "Bitcoin Proof-of-Work": ["National Bank of Hungary"],
  }
},

"Iceland": {
  region: "Europe",
  domains: {
    "Tobacco": ["Directorate of Health"],
    "Ultra-Processed Food": ["Icelandic Food and Veterinary Authority"],
    "Global Fisheries": ["Directorate of Fisheries"],
    "Water Privatization": ["Environment Agency of Iceland"],
    "Aviation Emissions": ["Icelandic Transport Authority"],
    "Algorithmic Pricing": ["Icelandic Competition Authority"],
    "Gig Economy Platforms": ["Directorate of Labour"],
    "Forever Chemicals (PFAS)": ["Environment Agency of Iceland"],
  }
},

"Ireland": {
  region: "Europe",
  domains: {
    "Tobacco": ["Department of Health"],
    "Ultra-Processed Food": ["Food Safety Authority of Ireland"],
    "Topsoil Erosion": ["Department of Agriculture, Food and the Marine"],
    "Water Privatization": ["Irish Water (Uisce Éireann)"],
    "Global Fisheries": ["Department of Agriculture, Food and the Marine"],
    "Forever Chemicals (PFAS)": ["Environmental Protection Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Environmental Protection Agency"],
    "Arms Exports": ["Department of Enterprise, Trade and Employment"],
    "Aviation Emissions": ["Irish Aviation Authority"],
    "Opioid Ecosystem": ["Health Products Regulatory Authority"],
    "Commercial Gambling": ["Gambling Regulatory Authority of Ireland"],
    "Algorithmic Pricing": ["Competition and Consumer Protection Commission"],
    "Big Tech Platform Monopoly": ["Competition and Consumer Protection Commission"],
    "Bitcoin Proof-of-Work": ["Central Bank of Ireland"],
    "Gig Economy Platforms": ["Workplace Relations Commission"],
    "Pharmacy Benefit Managers": ["Health Service Executive"],
    "Proof of Stake Protocols": ["Central Bank of Ireland"],
  }
},

"Italy": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Food Sovereignty and Forestry"],
    "Oil & Gas Extraction": ["Ministry of Environment and Energy Security"],
    "Cement (Calcination Floor)": ["Ministry of Environment and Energy Security"],
    "Water Privatization": ["Regulatory Authority for Energy, Networks and Environment"],
    "Forever Chemicals (PFAS)": ["Institute for Environmental Protection and Research"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Institute for Environmental Protection and Research"],
    "Global Fisheries": ["Ministry of Agriculture, Food Sovereignty and Forestry"],
    "Arms Exports": ["Ministry of Defence", "Ministry of Foreign Affairs (export licensing)"],
    "Aviation Emissions": ["National Civil Aviation Authority"],
    "Opioid Ecosystem": ["Italian Medicines Agency"],
    "Commercial Gambling": ["Customs and Monopolies Agency"],
    "Algorithmic Pricing": ["Italian Competition Authority"],
    "Big Tech Platform Monopoly": ["Italian Competition Authority", "Communications Authority"],
    "Bitcoin Proof-of-Work": ["Securities and Exchange Commission (Consob)"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Policies"],
    "Nuclear Fission": ["National Inspectorate for Nuclear Safety and Radiation Protection (Italy is nuclear-free since 1990 referendum)"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Infrastructure and Sustainable Mobility"],
    "Pharmacy Benefit Managers": ["Italian Medicines Agency"],
    "Proof of Stake Protocols": ["Securities and Exchange Commission (Consob)"],
  }
},

"Latvia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Food and Veterinary Service"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Public Utilities Commission"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["State Labour Inspectorate"],
    "Commercial Gambling": ["Lotteries and Gambling Supervisory Inspection"],
  }
},

"Liechtenstein": {
  region: "Europe",
  domains: {
    "Tobacco": ["Office of Public Health"],
    "Ultra-Processed Food": ["Office of Public Health"],
    "Aviation Emissions": ["Office of Civil Aviation"],
    "Bitcoin Proof-of-Work": ["Financial Market Authority"],
    "Proof of Stake Protocols": ["Financial Market Authority"],
  }
},

"Lithuania": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["State Food and Veterinary Service"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["State Energy Regulatory Council"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Civil Aviation Administration"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["State Labour Inspectorate"],
    "Commercial Gambling": ["Lithuanian Gaming Control Authority"],
  }
},

"Luxembourg": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["National Food Safety Laboratory"],
    "Water Privatization": ["Water Management Administration"],
    "Arms Exports": ["Ministry of Foreign and European Affairs"],
    "Aviation Emissions": ["Directorate of Civil Aviation"],
    "Algorithmic Pricing": ["Competition Council"],
    "Bitcoin Proof-of-Work": ["Financial Sector Supervisory Commission"],
    "Proof of Stake Protocols": ["Financial Sector Supervisory Commission"],
    "Commercial Gambling": ["Ministry of Justice"],
  }
},

"Malta": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry for Health"],
    "Ultra-Processed Food": ["Environmental Health Directorate"],
    "Water Privatization": ["Water Services Corporation"],
    "Global Fisheries": ["Department of Fisheries and Aquaculture"],
    "Aviation Emissions": ["Transport Malta (Civil Aviation Directorate)"],
    "Algorithmic Pricing": ["Malta Competition and Consumer Affairs Authority"],
    "Commercial Gambling": ["Malta Gaming Authority"],
    "Bitcoin Proof-of-Work": ["Malta Financial Services Authority"],
    "Proof of Stake Protocols": ["Malta Financial Services Authority", "Malta Digital Innovation Authority"],
  }
},

"Moldova": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["National Food Safety Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food Industry"],
    "Water Privatization": ["Agency for Technical Supervision"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Protection"],
  }
},

"Monaco": {
  region: "Europe",
  domains: {
    "Tobacco": ["Department of Health Affairs"],
    "Ultra-Processed Food": ["Department of Health Affairs"],
    "Commercial Gambling": ["Gaming Commission of Monaco"],
    "Aviation Emissions": ["Directorate of Civil Aviation"],
    "Water Privatization": ["Monegasque Water Company"],
  }
},

"Montenegro": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Administration for Food Safety, Veterinary and Phytosanitary Affairs"],
    "Topsoil Erosion": ["Ministry of Agriculture, Forestry and Water Management"],
    "Water Privatization": ["Ministry of Agriculture, Forestry and Water Management"],
    "Global Fisheries": ["Ministry of Agriculture, Forestry and Water Management"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
    "Algorithmic Pricing": ["Agency for Protection of Competition"],
    "Commercial Gambling": ["Ministry of Finance (Games of Chance Administration)"],
  }
},

"Netherlands": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health, Welfare and Sport"],
    "Ultra-Processed Food": ["Netherlands Food and Consumer Product Safety Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture, Nature and Food Quality"],
    "Oil & Gas Extraction": ["State Supervision of Mines", "Ministry of Economic Affairs and Climate Policy"],
    "Water Privatization": ["Dutch Water Authorities"],
    "Forever Chemicals (PFAS)": ["National Institute for Public Health and the Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["National Institute for Public Health and the Environment"],
    "Global Fisheries": ["Ministry of Agriculture, Nature and Food Quality"],
    "Arms Exports": ["Ministry of Foreign Affairs"],
    "Aviation Emissions": ["Human Environment and Transport Inspectorate"],
    "Opioid Ecosystem": ["Medicines Evaluation Board"],
    "Algorithmic Pricing": ["Authority for Consumers and Markets"],
    "Big Tech Platform Monopoly": ["Authority for Consumers and Markets"],
    "Bitcoin Proof-of-Work": ["Netherlands Authority for the Financial Markets"],
    "Gig Economy Platforms": ["Ministry of Social Affairs and Employment"],
    "Pharmacy Benefit Managers": ["National Health Care Institute"],
    "Proof of Stake Protocols": ["Netherlands Authority for the Financial Markets"],
    "Commercial Gambling": ["Netherlands Gambling Authority"],
    "Gene Drives (Ecological Ratchet)": ["Commission on Genetic Modification"],
  }
},

"North Macedonia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Food and Veterinary Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture, Forestry and Water Economy"],
    "Water Privatization": ["Ministry of Agriculture, Forestry and Water Economy"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
    "Algorithmic Pricing": ["Commission for Protection of Competition"],
  }
},

"Norway": {
  region: "Europe",
  domains: {
    "Tobacco": ["Norwegian Institute of Public Health"],
    "Ultra-Processed Food": ["Norwegian Food Safety Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food"],
    "Oil & Gas Extraction": ["Norwegian Petroleum Directorate", "Ministry of Energy", "Equinor (state energy company)"],
    "Water Privatization": ["Norwegian Environment Agency"],
    "Forever Chemicals (PFAS)": ["Norwegian Environment Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Norwegian Environment Agency"],
    "Global Fisheries": ["Norwegian Directorate of Fisheries"],
    "Arms Exports": ["Ministry of Foreign Affairs"],
    "Aviation Emissions": ["Civil Aviation Authority of Norway"],
    "Opioid Ecosystem": ["Norwegian Medicines Agency"],
    "Algorithmic Pricing": ["Norwegian Competition Authority"],
    "Big Tech Platform Monopoly": ["Norwegian Competition Authority", "Norwegian Communications Authority"],
    "Gig Economy Platforms": ["Norwegian Labour Inspection Authority"],
    "Pharmacy Benefit Managers": ["Norwegian Medicines Agency"],
    "Deep-Sea Mining (Abyssal Floor)": ["Norwegian Petroleum Directorate", "Ministry of Energy"],
    "Bitcoin Proof-of-Work": ["Financial Supervisory Authority of Norway"],
  }
},

"Poland": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Chief Sanitary Inspectorate"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Global Coal Combustion": ["Ministry of Climate and Environment"],
    "Cement (Calcination Floor)": ["Ministry of Climate and Environment"],
    "Water Privatization": ["State Water Holding Polish Waters"],
    "Forever Chemicals (PFAS)": ["Chief Inspectorate of Environmental Protection"],
    "Arms Exports": ["Ministry of National Defence", "Ministry of Development and Technology"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Opioid Ecosystem": ["Office for Registration of Medicinal Products, Medical Devices and Biocidal Products"],
    "Algorithmic Pricing": ["Office of Competition and Consumer Protection"],
    "Gig Economy Platforms": ["Ministry of Family and Social Policy"],
    "Nuclear Fission": ["National Atomic Energy Agency"],
    "Commercial Gambling": ["Ministry of Finance"],
    "Bitcoin Proof-of-Work": ["Polish Financial Supervision Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
  }
},

"Portugal": {
  region: "Europe",
  domains: {
    "Tobacco": ["Directorate-General of Health"],
    "Ultra-Processed Food": ["Economic and Food Safety Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Food"],
    "Water Privatization": ["Water and Waste Services Regulation Authority"],
    "Global Fisheries": ["Directorate-General of Natural Resources, Safety and Maritime Services"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["National Civil Aviation Authority"],
    "Opioid Ecosystem": ["National Authority of Medicines and Health Products"],
    "Algorithmic Pricing": ["Portuguese Competition Authority"],
    "Big Tech Platform Monopoly": ["Portuguese Competition Authority"],
    "Gig Economy Platforms": ["Authority for Working Conditions"],
    "Commercial Gambling": ["Gambling Regulation and Inspection Service"],
    "Bitcoin Proof-of-Work": ["Portuguese Securities Market Commission"],
    "Proof of Stake Protocols": ["Portuguese Securities Market Commission"],
  }
},

"Romania": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["National Sanitary Veterinary and Food Safety Authority"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Water Privatization": ["National Administration Romanian Waters"],
    "Oil & Gas Extraction": ["National Agency for Mineral Resources"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Romanian Civil Aeronautical Authority"],
    "Nuclear Fission": ["National Commission for Nuclear Activities Control"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Solidarity"],
    "Commercial Gambling": ["National Gambling Office"],
  }
},

"Russia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Federal Service for Surveillance on Consumer Rights Protection and Human Wellbeing"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Energy", "Rosneft (state oil company)", "Gazprom (state gas company)"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Trade"],
    "Water Privatization": ["Ministry of Natural Resources and Environment"],
    "Forever Chemicals (PFAS)": ["Federal Service for Supervision of Natural Resources"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Federal Service for Supervision of Natural Resources"],
    "Global Fisheries": ["Federal Agency for Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Arms Exports": ["Federal Service for Military-Technical Cooperation", "Rosoboronexport (state arms export agency)"],
    "Weapons of Mass Destruction Capability Diffusion": ["State Atomic Energy Corporation (Rosatom)", "Ministry of Foreign Affairs"],
    "Orbital Debris (Kessler Ceiling)": ["Roscosmos (state space corporation)"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of Natural Resources and Environment"],
    "Aviation Emissions": ["Federal Air Transport Agency"],
    "Opioid Ecosystem": ["Federal Service for Surveillance on Consumer Rights Protection and Human Wellbeing"],
    "Commercial Gambling": ["Federal Tax Service (gambling zones)"],
    "Algorithmic Pricing": ["Federal Antimonopoly Service"],
    "Big Tech Platform Monopoly": ["Federal Antimonopoly Service"],
    "Bitcoin Proof-of-Work": ["Central Bank of Russia", "Ministry of Finance"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Protection"],
    "Nuclear Fission": ["State Atomic Energy Corporation (Rosatom)", "Federal Service for Ecological, Technological and Nuclear Supervision"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Construction, Housing and Utilities"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Natural Resources and Environment"],
    "Proof of Stake Protocols": ["Central Bank of Russia"],
  }
},

"San Marino": {
  region: "Europe",
  domains: {
    "Tobacco": ["Institute for Social Security (Health Authority)"],
    "Ultra-Processed Food": ["Institute for Social Security (Health Authority)"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Serbia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Agriculture, Forestry and Water Management"],
    "Topsoil Erosion": ["Ministry of Agriculture, Forestry and Water Management"],
    "Water Privatization": ["Ministry of Agriculture, Forestry and Water Management"],
    "Arms Exports": ["Ministry of Defence", "Ministry of Trade, Tourism and Telecommunications"],
    "Aviation Emissions": ["Directorate of Civil Aviation"],
    "Algorithmic Pricing": ["Commission for Protection of Competition"],
    "Gig Economy Platforms": ["Ministry of Labour, Employment, Veterans and Social Affairs"],
  }
},

"Slovakia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["State Veterinary and Food Administration"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Water Privatization": ["Ministry of Environment"],
    "Nuclear Fission": ["Nuclear Regulatory Authority"],
    "Arms Exports": ["Ministry of Economy (export licensing)"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Algorithmic Pricing": ["Antimonopoly Office"],
    "Gig Economy Platforms": ["Ministry of Labour, Social Affairs and Family"],
  }
},

"Slovenia": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Administration for Food Safety, Veterinary Sector and Plant Protection"],
    "Topsoil Erosion": ["Ministry of Agriculture, Forestry and Food"],
    "Water Privatization": ["Ministry of Natural Resources and Spatial Planning"],
    "Nuclear Fission": ["Slovenian Nuclear Safety Administration"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation Agency"],
    "Algorithmic Pricing": ["Slovenian Competition Protection Agency"],
    "Gig Economy Platforms": ["Ministry of Labour, Family, Social Affairs and Equal Opportunities"],
  }
},

"Spain": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Spanish Agency for Food Safety and Nutrition"],
    "Topsoil Erosion": ["Ministry of Agriculture, Fisheries and Food"],
    "Oil & Gas Extraction": ["Ministry for the Ecological Transition and the Demographic Challenge"],
    "Global Coal Combustion": ["Ministry for the Ecological Transition and the Demographic Challenge"],
    "Cement (Calcination Floor)": ["Ministry for the Ecological Transition and the Demographic Challenge"],
    "Water Privatization": ["Ministry for the Ecological Transition and the Demographic Challenge"],
    "Forever Chemicals (PFAS)": ["Ministry for the Ecological Transition and the Demographic Challenge"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry for the Ecological Transition and the Demographic Challenge"],
    "Global Fisheries": ["Ministry of Agriculture, Fisheries and Food"],
    "Arms Exports": ["Ministry of Defence", "Ministry of Industry, Trade and Tourism"],
    "Aviation Emissions": ["State Aviation Safety Agency"],
    "Opioid Ecosystem": ["Spanish Agency of Medicines and Health Products"],
    "Commercial Gambling": ["Directorate General for the Regulation of Gambling"],
    "Algorithmic Pricing": ["National Markets and Competition Commission"],
    "Big Tech Platform Monopoly": ["National Markets and Competition Commission"],
    "Bitcoin Proof-of-Work": ["National Securities Market Commission"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Economy"],
    "Nuclear Fission": ["Nuclear Safety Council"],
    "Pharmacy Benefit Managers": ["Interministerial Commission on Drug Pricing"],
    "Proof of Stake Protocols": ["National Securities Market Commission"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Transport and Sustainable Mobility"],
  }
},

"Sweden": {
  region: "Europe",
  domains: {
    "Tobacco": ["Public Health Agency of Sweden"],
    "Ultra-Processed Food": ["National Food Agency"],
    "Topsoil Erosion": ["Swedish Board of Agriculture"],
    "Water Privatization": ["Swedish Agency for Marine and Water Management"],
    "Forever Chemicals (PFAS)": ["Swedish Chemicals Agency"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Swedish Chemicals Agency"],
    "Arms Exports": ["Swedish Inspectorate of Strategic Products"],
    "Aviation Emissions": ["Swedish Transport Agency"],
    "Opioid Ecosystem": ["Medical Products Agency"],
    "Algorithmic Pricing": ["Swedish Competition Authority"],
    "Big Tech Platform Monopoly": ["Swedish Competition Authority"],
    "Gig Economy Platforms": ["Swedish Work Environment Authority"],
    "Nuclear Fission": ["Swedish Radiation Safety Authority"],
    "Pharmacy Benefit Managers": ["Dental and Pharmaceutical Benefits Agency"],
    "Bitcoin Proof-of-Work": ["Swedish Financial Supervisory Authority"],
    "Global Fisheries": ["Swedish Agency for Marine and Water Management"],
  }
},

"Switzerland": {
  region: "Europe",
  domains: {
    "Tobacco": ["Federal Office of Public Health"],
    "Ultra-Processed Food": ["Federal Food Safety and Veterinary Office"],
    "Topsoil Erosion": ["Federal Office for Agriculture"],
    "Water Privatization": ["Federal Office for the Environment"],
    "Forever Chemicals (PFAS)": ["Federal Office for the Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Federal Office for the Environment"],
    "Arms Exports": ["State Secretariat for Economic Affairs (export controls)"],
    "Aviation Emissions": ["Federal Office of Civil Aviation"],
    "Opioid Ecosystem": ["Swiss Agency for Therapeutic Products"],
    "Algorithmic Pricing": ["Competition Commission"],
    "Big Tech Platform Monopoly": ["Competition Commission"],
    "Bitcoin Proof-of-Work": ["Swiss Financial Market Supervisory Authority"],
    "Gig Economy Platforms": ["State Secretariat for Economic Affairs"],
    "Nuclear Fission": ["Federal Nuclear Safety Inspectorate"],
    "Pharmacy Benefit Managers": ["Federal Office of Public Health"],
    "Proof of Stake Protocols": ["Swiss Financial Market Supervisory Authority"],
    "Commercial Gambling": ["Swiss Federal Gaming Board"],
    "Weapons of Mass Destruction Capability Diffusion": ["State Secretariat for Economic Affairs (non-proliferation export controls)"],
  }
},

"Turkey": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health", "Tobacco and Alcohol Market Regulatory Authority"],
    "Ultra-Processed Food": ["Ministry of Agriculture and Forestry"],
    "Topsoil Erosion": ["Ministry of Agriculture and Forestry"],
    "Oil & Gas Extraction": ["Turkish Petroleum Corporation", "Energy Market Regulatory Authority"],
    "Global Coal Combustion": ["Ministry of Energy and Natural Resources"],
    "Cement (Calcination Floor)": ["Ministry of Environment, Urbanization and Climate Change"],
    "Water Privatization": ["State Hydraulic Works", "Ministry of Agriculture and Forestry"],
    "Forever Chemicals (PFAS)": ["Ministry of Environment, Urbanization and Climate Change"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment, Urbanization and Climate Change"],
    "Global Fisheries": ["Ministry of Agriculture and Forestry"],
    "Industrial Monoculture": ["Ministry of Agriculture and Forestry"],
    "Arms Exports": ["Ministry of National Defence", "Presidency of Defence Industries"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Opioid Ecosystem": ["Turkish Medicines and Medical Devices Agency"],
    "Commercial Gambling": ["Revenue Administration (national lottery)", "Betting authority"],
    "Algorithmic Pricing": ["Turkish Competition Authority"],
    "Big Tech Platform Monopoly": ["Turkish Competition Authority", "Information and Communication Technologies Authority"],
    "Bitcoin Proof-of-Work": ["Capital Markets Board of Turkey", "Central Bank of the Republic of Turkey"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Security"],
    "Nuclear Fission": ["Turkish Energy, Nuclear and Mining Research Authority", "Nuclear Regulatory Authority"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Environment, Urbanization and Climate Change"],
    "Weapons of Mass Destruction Capability Diffusion": ["Ministry of Foreign Affairs (non-proliferation)"],
  }
},

"Ukraine": {
  region: "Europe",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["State Service of Ukraine on Food Safety and Consumer Protection"],
    "Topsoil Erosion": ["Ministry of Agrarian Policy and Food"],
    "Oil & Gas Extraction": ["Naftogaz of Ukraine (state energy company)"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Water Privatization": ["Ministry of Communities, Territories and Infrastructure Development"],
    "Arms Exports": ["State Service of Export Control"],
    "Nuclear Fission": ["State Nuclear Regulatory Inspectorate"],
    "Aviation Emissions": ["State Aviation Administration"],
    "Algorithmic Pricing": ["Antimonopoly Committee"],
    "Gig Economy Platforms": ["Ministry of Economy"],
    "Industrial Monoculture": ["Ministry of Agrarian Policy and Food"],
  }
},

"United Kingdom": {
  region: "Europe",
  domains: {
    "Tobacco": ["Department of Health and Social Care", "Medicines and Healthcare products Regulatory Agency"],
    "Ultra-Processed Food": ["Food Standards Agency"],
    "Topsoil Erosion": ["Department for Environment, Food and Rural Affairs"],
    "Oil & Gas Extraction": ["North Sea Transition Authority"],
    "Global Coal Combustion": ["Department for Energy Security and Net Zero"],
    "Cement (Calcination Floor)": ["Environment Agency"],
    "Water Privatization": ["Water Services Regulation Authority (Ofwat)"],
    "Forever Chemicals (PFAS)": ["Environment Agency", "Health and Safety Executive"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Environment Agency"],
    "Global Fisheries": ["Marine Management Organisation"],
    "Arms Exports": ["Export Control Joint Unit", "Ministry of Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["Office for Nuclear Regulation", "Ministry of Defence"],
    "Orbital Debris (Kessler Ceiling)": ["UK Space Agency"],
    "Gene Drives (Ecological Ratchet)": ["Department for Environment, Food and Rural Affairs", "Advisory Committee on Releases to the Environment"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Opioid Ecosystem": ["Medicines and Healthcare products Regulatory Agency", "National Crime Agency"],
    "Commercial Gambling": ["Gambling Commission"],
    "Algorithmic Pricing": ["Competition and Markets Authority"],
    "Big Tech Platform Monopoly": ["Competition and Markets Authority", "Digital Markets Unit", "Office of Communications (Ofcom)"],
    "Bitcoin Proof-of-Work": ["Financial Conduct Authority"],
    "Gig Economy Platforms": ["Department for Business and Trade"],
    "Nuclear Fission": ["Office for Nuclear Regulation"],
    "Commercial Real Estate Urban Hollowing": ["Department for Levelling Up, Housing and Communities"],
    "Deep-Sea Mining (Abyssal Floor)": ["International Seabed Authority (UK engagement)", "Department for Environment, Food and Rural Affairs"],
    "Student Loan Securitization": ["Student Loans Company"],
    "Pharmacy Benefit Managers": ["National Institute for Health and Care Excellence", "National Health Service England"],
    "Proof of Stake Protocols": ["Financial Conduct Authority"],
    "Palm Oil Deforestation": ["Department for Environment, Food and Rural Affairs"],
    "Industrial Monoculture": ["Department for Environment, Food and Rural Affairs"],
  }
},

// ═══════════════════════════════════════════════════════════════
// AMERICAS — 35 countries
// ═══════════════════════════════════════════════════════════════

"Antigua and Barbuda": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health, Wellness and the Environment"],
    "Ultra-Processed Food": ["Ministry of Health, Wellness and the Environment"],
    "Global Fisheries": ["Fisheries Division"],
    "Water Privatization": ["Antigua Public Utilities Authority"],
    "Aviation Emissions": ["Eastern Caribbean Civil Aviation Authority"],
    "Commercial Gambling": ["Antigua and Barbuda Gambling Authority"],
  }
},

"Argentina": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["National Food Safety Commission", "National Administration of Drugs, Food and Medical Technology"],
    "Topsoil Erosion": ["Ministry of Agriculture, Livestock and Fisheries"],
    "Oil & Gas Extraction": ["Secretary of Energy", "YPF (state energy company)"],
    "Global Coal Combustion": ["Secretary of Energy"],
    "Cement (Calcination Floor)": ["Ministry of Environment and Sustainable Development"],
    "Water Privatization": ["Water and Sanitation Agency"],
    "Forever Chemicals (PFAS)": ["Ministry of Environment and Sustainable Development"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Sustainable Development"],
    "Global Fisheries": ["Undersecretariat of Fisheries and Aquaculture"],
    "Industrial Monoculture": ["Ministry of Agriculture, Livestock and Fisheries"],
    "Arms Exports": ["Ministry of Defence", "National Agency for Controlled Materials"],
    "Weapons of Mass Destruction Capability Diffusion": ["National Atomic Energy Commission"],
    "Aviation Emissions": ["National Civil Aviation Administration"],
    "Opioid Ecosystem": ["National Administration of Drugs, Food and Medical Technology"],
    "Commercial Gambling": ["National Lottery and Casinos"],
    "Algorithmic Pricing": ["National Commission for the Defence of Competition"],
    "Big Tech Platform Monopoly": ["National Commission for the Defence of Competition"],
    "Bitcoin Proof-of-Work": ["National Securities Commission"],
    "Gig Economy Platforms": ["Ministry of Labour, Employment and Social Security"],
    "Nuclear Fission": ["Nuclear Regulatory Authority", "National Atomic Energy Commission"],
    "Student Loan Securitization": ["Ministry of Education"],
    "Pharmacy Benefit Managers": ["Ministry of Health (drug pricing regulation)"],
  }
},

"Bahamas": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Department of Marine Resources"],
    "Water Privatization": ["Water and Sewerage Corporation"],
    "Aviation Emissions": ["Bahamas Civil Aviation Authority"],
    "Commercial Gambling": ["Gaming Board for the Bahamas"],
    "Bitcoin Proof-of-Work": ["Securities Commission of the Bahamas"],
  }
},

"Barbados": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health and Wellness"],
    "Ultra-Processed Food": ["Barbados National Standards Institution"],
    "Global Fisheries": ["Fisheries Division"],
    "Water Privatization": ["Barbados Water Authority"],
    "Aviation Emissions": ["Barbados Civil Aviation Department"],
    "Commercial Gambling": ["Barbados Gaming Authority (planned)"],
    "Algorithmic Pricing": ["Fair Trading Commission"],
  }
},

"Belize": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health and Wellness"],
    "Ultra-Processed Food": ["Belize Bureau of Standards"],
    "Topsoil Erosion": ["Ministry of Agriculture, Food Security and Enterprise"],
    "Global Fisheries": ["Fisheries Department"],
    "Water Privatization": ["Belize Water Services"],
    "Palm Oil Deforestation": ["Forest Department"],
    "Aviation Emissions": ["Department of Civil Aviation"],
    "Industrial Monoculture": ["Ministry of Agriculture, Food Security and Enterprise"],
  }
},

"Bolivia": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health and Sports"],
    "Ultra-Processed Food": ["Ministry of Health and Sports"],
    "Topsoil Erosion": ["Ministry of Rural Development and Land"],
    "Oil & Gas Extraction": ["Yacimientos Petrolíferos Fiscales Bolivianos (state oil company)"],
    "Water Privatization": ["Ministry of Environment and Water"],
    "Industrial Monoculture": ["Ministry of Rural Development and Land"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aeronautics"],
    "Deep-Sea Mining (Abyssal Floor)": ["State Mining Corporation"],
    "Opioid Ecosystem": ["Ministry of Health and Sports"],
  }
},

"Brazil": {
  region: "Americas",
  domains: {
    "Tobacco": ["National Health Surveillance Agency", "Ministry of Health"],
    "Ultra-Processed Food": ["National Health Surveillance Agency"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Oil & Gas Extraction": ["National Agency of Petroleum, Natural Gas and Biofuels", "Petrobras (state energy company)"],
    "Global Coal Combustion": ["Ministry of Mines and Energy"],
    "Cement (Calcination Floor)": ["Ministry of the Environment and Climate Change"],
    "Water Privatization": ["National Water and Sanitation Agency"],
    "Forever Chemicals (PFAS)": ["Brazilian Institute of Environment and Renewable Natural Resources"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Brazilian Institute of Environment and Renewable Natural Resources"],
    "Global Fisheries": ["Ministry of Fisheries and Aquaculture"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
    "Palm Oil Deforestation": ["Brazilian Institute of Environment and Renewable Natural Resources", "Ministry of the Environment and Climate Change"],
    "Arms Exports": ["Ministry of Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["National Nuclear Energy Commission"],
    "Orbital Debris (Kessler Ceiling)": ["Brazilian Space Agency"],
    "Gene Drives (Ecological Ratchet)": ["National Technical Commission on Biosafety"],
    "Aviation Emissions": ["National Civil Aviation Agency"],
    "Opioid Ecosystem": ["National Health Surveillance Agency"],
    "Commercial Gambling": ["Ministry of Finance (newly legalized sports betting regulation)"],
    "Algorithmic Pricing": ["Administrative Council for Economic Defence"],
    "Big Tech Platform Monopoly": ["Administrative Council for Economic Defence"],
    "Bitcoin Proof-of-Work": ["Central Bank of Brazil", "Securities and Exchange Commission of Brazil"],
    "Gig Economy Platforms": ["Ministry of Labour and Employment"],
    "Nuclear Fission": ["National Nuclear Energy Commission"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Cities"],
    "Deep-Sea Mining (Abyssal Floor)": ["Interministerial Commission for the Resources of the Sea"],
    "Student Loan Securitization": ["Ministry of Education (FIES program)"],
    "Pharmacy Benefit Managers": ["Medicines Market Regulation Chamber"],
    "Proof of Stake Protocols": ["Central Bank of Brazil"],
  }
},

"Canada": {
  region: "Americas",
  domains: {
    "Tobacco": ["Health Canada"],
    "Ultra-Processed Food": ["Canadian Food Inspection Agency", "Health Canada"],
    "Topsoil Erosion": ["Agriculture and Agri-Food Canada"],
    "Oil & Gas Extraction": ["Canada Energy Regulator", "Natural Resources Canada"],
    "Global Coal Combustion": ["Environment and Climate Change Canada"],
    "Cement (Calcination Floor)": ["Environment and Climate Change Canada"],
    "Water Privatization": ["Environment and Climate Change Canada", "Provincial water agencies"],
    "Forever Chemicals (PFAS)": ["Environment and Climate Change Canada", "Health Canada"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Environment and Climate Change Canada"],
    "Global Fisheries": ["Fisheries and Oceans Canada"],
    "Industrial Monoculture": ["Agriculture and Agri-Food Canada"],
    "Arms Exports": ["Global Affairs Canada (export controls)", "Department of National Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["Canadian Nuclear Safety Commission", "Global Affairs Canada"],
    "Orbital Debris (Kessler Ceiling)": ["Canadian Space Agency"],
    "Gene Drives (Ecological Ratchet)": ["Environment and Climate Change Canada", "Canadian Food Inspection Agency"],
    "Aviation Emissions": ["Transport Canada"],
    "Opioid Ecosystem": ["Health Canada", "Canadian Centre on Substance Use and Addiction"],
    "Commercial Gambling": ["Provincial gaming corporations and regulatory bodies"],
    "Algorithmic Pricing": ["Competition Bureau Canada"],
    "Big Tech Platform Monopoly": ["Competition Bureau Canada", "Canadian Radio-television and Telecommunications Commission"],
    "Bitcoin Proof-of-Work": ["Financial Transactions and Reports Analysis Centre of Canada", "Canadian Securities Administrators"],
    "Gig Economy Platforms": ["Employment and Social Development Canada"],
    "Nuclear Fission": ["Canadian Nuclear Safety Commission"],
    "Commercial Real Estate Urban Hollowing": ["Canada Mortgage and Housing Corporation"],
    "Deep-Sea Mining (Abyssal Floor)": ["Natural Resources Canada"],
    "Student Loan Securitization": ["National Student Loans Service Centre"],
    "Pharmacy Benefit Managers": ["Patented Medicine Prices Review Board"],
    "Proof of Stake Protocols": ["Canadian Securities Administrators"],
    "Palm Oil Deforestation": ["Environment and Climate Change Canada"],
  }
},

"Chile": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health (food labelling law)"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["National Petroleum Company"],
    "Water Privatization": ["Superintendency of Sanitary Services"],
    "Global Fisheries": ["National Fisheries and Aquaculture Service"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Cement (Calcination Floor)": ["Ministry of the Environment"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aeronautics"],
    "Algorithmic Pricing": ["National Economic Prosecutor's Office"],
    "Big Tech Platform Monopoly": ["National Economic Prosecutor's Office"],
    "Bitcoin Proof-of-Work": ["Financial Market Commission"],
    "Gig Economy Platforms": ["Labour Directorate"],
    "Deep-Sea Mining (Abyssal Floor)": ["National Geology and Mining Service"],
    "Commercial Gambling": ["Gaming Board"],
    "Pharmacy Benefit Managers": ["National Health Fund"],
    "Nuclear Fission": ["Chilean Nuclear Energy Commission"],
  }
},

"Colombia": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health and Social Protection"],
    "Ultra-Processed Food": ["National Institute for Food and Drug Surveillance", "Ministry of Health and Social Protection"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Oil & Gas Extraction": ["National Hydrocarbons Agency", "Ecopetrol (state oil company)"],
    "Global Coal Combustion": ["Ministry of Mines and Energy"],
    "Water Privatization": ["Superintendency of Residential Public Utilities"],
    "Global Fisheries": ["National Authority for Aquaculture and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
    "Palm Oil Deforestation": ["Ministry of Environment and Sustainable Development"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Special Administrative Unit of Civil Aeronautics"],
    "Opioid Ecosystem": ["National Institute for Food and Drug Surveillance", "Ministry of Justice"],
    "Commercial Gambling": ["National Gaming Company"],
    "Algorithmic Pricing": ["Superintendency of Industry and Commerce"],
    "Big Tech Platform Monopoly": ["Superintendency of Industry and Commerce"],
    "Bitcoin Proof-of-Work": ["Financial Superintendency of Colombia"],
    "Gig Economy Platforms": ["Ministry of Labour"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Sustainable Development"],
  }
},

"Costa Rica": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Water Privatization": ["Costa Rican Institute of Aqueducts and Sewers"],
    "Global Fisheries": ["Costa Rican Fisheries and Aquaculture Institute"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Algorithmic Pricing": ["Commission for the Promotion of Competition"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Security"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Energy"],
  }
},

"Cuba": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["National Institute of Water Resources"],
    "Global Fisheries": ["Ministry of Food Industry"],
    "Industrial Monoculture": ["Ministry of Agriculture (sugar sector)"],
    "Arms Exports": ["Ministry of the Revolutionary Armed Forces"],
    "Aviation Emissions": ["Institute of Civil Aeronautics"],
    "Opioid Ecosystem": ["Ministry of Public Health"],
    "Pharmacy Benefit Managers": ["National Center for Drug and Medical Technology Information"],
  }
},

"Dominica": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health, Wellness and New Health Investment"],
    "Ultra-Processed Food": ["Ministry of Health, Wellness and New Health Investment"],
    "Global Fisheries": ["Fisheries Division"],
    "Water Privatization": ["Dominica Water and Sewerage Company"],
    "Aviation Emissions": ["Eastern Caribbean Civil Aviation Authority"],
  }
},

"Dominican Republic": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["National Institute of Potable Water and Sewerage"],
    "Global Fisheries": ["Dominican Council of Fisheries and Aquaculture"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Dominican Institute of Civil Aviation"],
    "Commercial Gambling": ["National Casinos Directorate"],
    "Opioid Ecosystem": ["National Drug Council"],
    "Gig Economy Platforms": ["Ministry of Labour"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
  }
},

"Ecuador": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["National Agency for Health Regulation, Control and Surveillance"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Oil & Gas Extraction": ["Ministry of Energy and Mines", "Petroecuador (state oil company)"],
    "Water Privatization": ["Water Regulation and Control Agency"],
    "Global Fisheries": ["Ministry of Production, Foreign Trade, Investments and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
    "Palm Oil Deforestation": ["Ministry of Environment, Water and Ecological Transition"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Arms Exports": ["Ministry of National Defence"],
    "Opioid Ecosystem": ["National Agency for Health Regulation, Control and Surveillance"],
    "Algorithmic Pricing": ["Superintendency of Market Power Control"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Energy and Mines"],
  }
},

"El Salvador": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Water Privatization": ["National Administration of Aqueducts and Sewers"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Bitcoin Proof-of-Work": ["Central Reserve Bank of El Salvador (Bitcoin is legal tender)"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Welfare"],
    "Algorithmic Pricing": ["Superintendency of Competition"],
  }
},

"Grenada": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Fisheries Division"],
    "Water Privatization": ["National Water and Sewerage Authority"],
    "Aviation Emissions": ["Eastern Caribbean Civil Aviation Authority"],
  }
},

"Guatemala": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health and Social Assistance"],
    "Ultra-Processed Food": ["Ministry of Public Health and Social Assistance"],
    "Topsoil Erosion": ["Ministry of Agriculture, Livestock and Food"],
    "Water Privatization": ["Municipal water boards"],
    "Palm Oil Deforestation": ["National Council for Protected Areas"],
    "Industrial Monoculture": ["Ministry of Agriculture, Livestock and Food"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aeronautics"],
    "Opioid Ecosystem": ["Ministry of Public Health and Social Assistance"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Welfare"],
  }
},

"Guyana": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Natural Resources"],
    "Global Fisheries": ["Fisheries Department"],
    "Water Privatization": ["Guyana Water Incorporated"],
    "Palm Oil Deforestation": ["Guyana Forestry Commission"],
    "Aviation Emissions": ["Guyana Civil Aviation Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Natural Resources"],
  }
},

"Haiti": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health and Population"],
    "Ultra-Processed Food": ["Ministry of Public Health and Population"],
    "Topsoil Erosion": ["Ministry of Agriculture, Natural Resources and Rural Development"],
    "Water Privatization": ["National Directorate of Drinking Water and Sanitation"],
    "Aviation Emissions": ["National Civil Aviation Office"],
    "Industrial Monoculture": ["Ministry of Agriculture, Natural Resources and Rural Development"],
  }
},

"Honduras": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Water Privatization": ["National Autonomous Water and Sewer Service"],
    "Palm Oil Deforestation": ["Institute for Forest Conservation"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aeronautics"],
    "Global Fisheries": ["Directorate General of Fisheries and Aquaculture"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Security"],
  }
},

"Jamaica": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health and Wellness"],
    "Ultra-Processed Food": ["Ministry of Health and Wellness", "Bureau of Standards Jamaica"],
    "Topsoil Erosion": ["Ministry of Agriculture, Fisheries and Mining"],
    "Water Privatization": ["National Water Commission"],
    "Global Fisheries": ["Ministry of Agriculture, Fisheries and Mining"],
    "Arms Exports": ["Jamaica Defence Force"],
    "Aviation Emissions": ["Jamaica Civil Aviation Authority"],
    "Commercial Gambling": ["Betting, Gaming and Lotteries Commission"],
    "Opioid Ecosystem": ["Ministry of Health and Wellness"],
    "Algorithmic Pricing": ["Fair Trading Commission"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Security"],
  }
},

"Mexico": {
  region: "Americas",
  domains: {
    "Tobacco": ["Federal Commission for the Protection against Sanitary Risk", "Ministry of Health"],
    "Ultra-Processed Food": ["Federal Commission for the Protection against Sanitary Risk"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Oil & Gas Extraction": ["Ministry of Energy", "Pemex (state oil company)", "National Hydrocarbons Commission"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Cement (Calcination Floor)": ["Ministry of Environment and Natural Resources"],
    "Water Privatization": ["National Water Commission"],
    "Forever Chemicals (PFAS)": ["Ministry of Environment and Natural Resources"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment and Natural Resources"],
    "Global Fisheries": ["National Commission of Aquaculture and Fisheries"],
    "Industrial Monoculture": ["Ministry of Agriculture and Rural Development"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Federal Civil Aviation Agency"],
    "Opioid Ecosystem": ["Federal Commission for the Protection against Sanitary Risk", "National Commission against Addictions"],
    "Commercial Gambling": ["Ministry of the Interior (Gaming and Raffles Directorate)"],
    "Algorithmic Pricing": ["Federal Economic Competition Commission"],
    "Big Tech Platform Monopoly": ["Federal Economic Competition Commission", "Federal Telecommunications Institute"],
    "Bitcoin Proof-of-Work": ["National Banking and Securities Commission"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Welfare"],
    "Nuclear Fission": ["National Commission on Nuclear Safety and Safeguards"],
    "Commercial Real Estate Urban Hollowing": ["Ministry of Agrarian, Territorial and Urban Development"],
    "Student Loan Securitization": ["Ministry of Public Education"],
    "Pharmacy Benefit Managers": ["Federal Commission for the Protection against Sanitary Risk"],
  }
},

"Nicaragua": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Forestry"],
    "Water Privatization": ["Nicaraguan Company of Aqueducts and Sewers"],
    "Global Fisheries": ["Nicaraguan Institute of Fisheries and Aquaculture"],
    "Industrial Monoculture": ["Ministry of Agriculture and Forestry"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Nicaraguan Institute of Civil Aeronautics"],
  }
},

"Panama": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health", "Panama Food Safety Authority"],
    "Topsoil Erosion": ["Ministry of Agricultural Development"],
    "Water Privatization": ["National Aqueducts and Sewers Institute"],
    "Global Fisheries": ["Aquatic Resources Authority of Panama"],
    "Arms Exports": ["Ministry of Public Security"],
    "Aviation Emissions": ["Civil Aeronautics Authority"],
    "Commercial Gambling": ["Gaming Control Board"],
    "Algorithmic Pricing": ["Authority for Consumer Protection and Defence of Competition"],
    "Bitcoin Proof-of-Work": ["Superintendency of the Securities Market"],
  }
},

"Paraguay": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health and Social Welfare"],
    "Ultra-Processed Food": ["Ministry of Public Health and Social Welfare"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Water Privatization": ["Sanitation Services Company"],
    "Industrial Monoculture": ["Ministry of Agriculture and Livestock"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["National Directorate of Civil Aeronautics"],
    "Algorithmic Pricing": ["National Competition Commission"],
    "Gig Economy Platforms": ["Ministry of Labour, Employment and Social Security"],
  }
},

"Peru": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["General Directorate of Environmental Health and Food Safety", "Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agrarian Development and Irrigation"],
    "Oil & Gas Extraction": ["Perupetro (state petroleum company)", "Ministry of Energy and Mines"],
    "Water Privatization": ["National Superintendency of Sanitation Services"],
    "Global Fisheries": ["Ministry of Production"],
    "Industrial Monoculture": ["Ministry of Agrarian Development and Irrigation"],
    "Palm Oil Deforestation": ["Ministry of the Environment", "National Forest and Wildlife Service"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aeronautics"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Energy and Mines"],
    "Algorithmic Pricing": ["National Institute for the Defence of Free Competition and the Protection of Intellectual Property"],
    "Gig Economy Platforms": ["Ministry of Labour and Employment Promotion"],
    "Opioid Ecosystem": ["General Directorate of Medicines, Supplies and Drugs"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of the Environment"],
  }
},

"Saint Kitts and Nevis": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Department of Marine Resources"],
    "Water Privatization": ["Water Services Department"],
    "Aviation Emissions": ["Eastern Caribbean Civil Aviation Authority"],
  }
},

"Saint Lucia": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health, Wellness and Elderly Affairs"],
    "Ultra-Processed Food": ["Bureau of Standards"],
    "Global Fisheries": ["Department of Fisheries"],
    "Water Privatization": ["Water and Sewerage Company"],
    "Aviation Emissions": ["Eastern Caribbean Civil Aviation Authority"],
  }
},

"Saint Vincent and the Grenadines": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health, Wellness and the Environment"],
    "Ultra-Processed Food": ["Ministry of Health, Wellness and the Environment"],
    "Global Fisheries": ["Fisheries Division"],
    "Water Privatization": ["Central Water and Sewerage Authority"],
    "Aviation Emissions": ["Eastern Caribbean Civil Aviation Authority"],
  }
},

"Suriname": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture, Animal Husbandry and Fisheries"],
    "Oil & Gas Extraction": ["State Oil Company Suriname"],
    "Global Fisheries": ["Ministry of Agriculture, Animal Husbandry and Fisheries"],
    "Water Privatization": ["Suriname Water Company"],
    "Palm Oil Deforestation": ["Foundation for Forest Management and Production Control"],
    "Aviation Emissions": ["Civil Aviation Safety Authority Suriname"],
    "Industrial Monoculture": ["Ministry of Agriculture, Animal Husbandry and Fisheries"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Natural Resources"],
  }
},

"Trinidad and Tobago": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Chemistry, Food and Drug Division"],
    "Topsoil Erosion": ["Ministry of Agriculture, Land and Fisheries"],
    "Oil & Gas Extraction": ["Ministry of Energy and Energy Industries"],
    "Water Privatization": ["Water and Sewerage Authority"],
    "Global Fisheries": ["Fisheries Division"],
    "Aviation Emissions": ["Trinidad and Tobago Civil Aviation Authority"],
    "Algorithmic Pricing": ["Fair Trading Commission (planned)"],
    "Opioid Ecosystem": ["Chemistry, Food and Drug Division"],
    "Gig Economy Platforms": ["Ministry of Labour"],
  }
},

"Uruguay": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Livestock, Agriculture and Fisheries"],
    "Water Privatization": ["State Sanitary Works Administration"],
    "Global Fisheries": ["National Directorate of Aquatic Resources"],
    "Industrial Monoculture": ["Ministry of Livestock, Agriculture and Fisheries"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["National Directorate of Civil Aviation and Aeronautical Infrastructure"],
    "Algorithmic Pricing": ["Commission for the Promotion and Defence of Competition"],
    "Gig Economy Platforms": ["Ministry of Labour and Social Security"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environment"],
  }
},

"Venezuela": {
  region: "Americas",
  domains: {
    "Tobacco": ["Ministry of Popular Power for Health"],
    "Ultra-Processed Food": ["Ministry of Popular Power for Food"],
    "Topsoil Erosion": ["Ministry of Popular Power for Agriculture and Lands"],
    "Oil & Gas Extraction": ["Ministry of Popular Power for Petroleum", "Petróleos de Venezuela (state oil company)"],
    "Water Privatization": ["Hidroven (state water utility)"],
    "Global Fisheries": ["Institute for Fisheries and Aquaculture"],
    "Industrial Monoculture": ["Ministry of Popular Power for Agriculture and Lands"],
    "Arms Exports": ["Ministry of Popular Power for Defence"],
    "Aviation Emissions": ["National Institute of Civil Aeronautics"],
    "Opioid Ecosystem": ["National Anti-Drug Office"],
    "Bitcoin Proof-of-Work": ["Superintendency of Cryptoassets"],
    "Algorithmic Pricing": ["Superintendency for the Defence of Socioeconomic Rights"],
  }
},

// ═══════════════════════════════════════════════════════════════
// MIDDLE EAST — 14 countries
// ═══════════════════════════════════════════════════════════════

"Bahrain": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Oil & Gas Extraction": ["National Oil and Gas Authority"],
    "Water Privatization": ["Electricity and Water Authority"],
    "Arms Exports": ["Bahrain Defence Force"],
    "Aviation Emissions": ["Civil Aviation Affairs"],
    "Algorithmic Pricing": ["Ministry of Industry and Commerce"],
    "Commercial Gambling": ["Gambling is illegal"],
    "Bitcoin Proof-of-Work": ["Central Bank of Bahrain"],
  }
},

"Iran": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health and Medical Education"],
    "Ultra-Processed Food": ["Iran Food and Drug Administration"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["National Iranian Oil Company", "Ministry of Petroleum"],
    "Global Coal Combustion": ["Ministry of Industry, Mine and Trade"],
    "Cement (Calcination Floor)": ["Ministry of Industry, Mine and Trade"],
    "Water Privatization": ["Ministry of Energy (water division)"],
    "Forever Chemicals (PFAS)": ["Department of Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Environment"],
    "Global Fisheries": ["Iran Fisheries Organization"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Arms Exports": ["Ministry of Defence and Armed Forces Logistics"],
    "Weapons of Mass Destruction Capability Diffusion": ["Atomic Energy Organization of Iran"],
    "Aviation Emissions": ["Civil Aviation Organization"],
    "Opioid Ecosystem": ["Drug Control Headquarters"],
    "Nuclear Fission": ["Atomic Energy Organization of Iran"],
    "Algorithmic Pricing": ["Competition Council"],
    "Gig Economy Platforms": ["Ministry of Cooperatives, Labour and Social Welfare"],
  }
},

"Iraq": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Oil", "Iraq National Oil Company"],
    "Water Privatization": ["Ministry of Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Iraqi Civil Aviation Authority"],
    "Opioid Ecosystem": ["Ministry of Health"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Minerals"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
  }
},

"Israel": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Rural Development"],
    "Water Privatization": ["Water Authority"],
    "Forever Chemicals (PFAS)": ["Ministry of Environmental Protection"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry of Environmental Protection"],
    "Arms Exports": ["Ministry of Defence (Defence Export Controls Agency)"],
    "Weapons of Mass Destruction Capability Diffusion": ["Israel Atomic Energy Commission (policy of nuclear ambiguity)"],
    "Orbital Debris (Kessler Ceiling)": ["Israel Space Agency"],
    "Aviation Emissions": ["Civil Aviation Authority of Israel"],
    "Opioid Ecosystem": ["Ministry of Health"],
    "Algorithmic Pricing": ["Israel Competition Authority"],
    "Big Tech Platform Monopoly": ["Israel Competition Authority"],
    "Bitcoin Proof-of-Work": ["Israel Securities Authority"],
    "Gig Economy Platforms": ["Ministry of Economy and Industry"],
    "Gene Drives (Ecological Ratchet)": ["Ministry of Agriculture and Rural Development"],
    "Nuclear Fission": ["Israel Atomic Energy Commission"],
    "Pharmacy Benefit Managers": ["Ministry of Health"],
  }
},

"Jordan": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Jordan Food and Drug Administration"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Water Authority of Jordan"],
    "Arms Exports": ["Jordan Armed Forces"],
    "Aviation Emissions": ["Civil Aviation Regulatory Commission"],
    "Opioid Ecosystem": ["Jordan Food and Drug Administration"],
    "Algorithmic Pricing": ["Ministry of Industry, Trade and Supply"],
    "Cement (Calcination Floor)": ["Ministry of Environment"],
    "Nuclear Fission": ["Jordan Atomic Energy Commission"],
  }
},

"Kuwait": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Oil & Gas Extraction": ["Kuwait Petroleum Corporation", "Ministry of Oil"],
    "Water Privatization": ["Ministry of Electricity, Water and Renewable Energy"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Algorithmic Pricing": ["Competition Protection Authority"],
    "Cement (Calcination Floor)": ["Environment Public Authority"],
  }
},

"Lebanon": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Regional water establishments"],
    "Arms Exports": ["Ministry of National Defence"],
    "Aviation Emissions": ["Directorate General of Civil Aviation"],
    "Opioid Ecosystem": ["Ministry of Public Health"],
    "Commercial Gambling": ["Casino du Liban"],
  }
},

"Oman": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Oil & Gas Extraction": ["Ministry of Energy and Minerals", "Petroleum Development Oman"],
    "Water Privatization": ["Public Authority for Water"],
    "Global Fisheries": ["Ministry of Agricultural, Fisheries and Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Public Authority for Civil Aviation"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Energy and Minerals"],
    "Algorithmic Pricing": ["Consumer Protection Authority"],
  }
},

"Palestine (Observer State)": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Water Privatization": ["Palestinian Water Authority"],
    "Aviation Emissions": ["Civil Aviation Authority (limited jurisdiction)"],
  }
},

"Qatar": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Public Health"],
    "Ultra-Processed Food": ["Ministry of Public Health"],
    "Oil & Gas Extraction": ["Qatar Energy (formerly Qatar Petroleum)"],
    "Water Privatization": ["Qatar General Electricity and Water Corporation"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Qatar Civil Aviation Authority"],
    "Algorithmic Pricing": ["Ministry of Commerce and Industry"],
    "Bitcoin Proof-of-Work": ["Qatar Financial Centre Regulatory Authority"],
    "Gig Economy Platforms": ["Ministry of Labour"],
  }
},

"Saudi Arabia": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Saudi Food and Drug Authority"],
    "Ultra-Processed Food": ["Saudi Food and Drug Authority"],
    "Topsoil Erosion": ["Ministry of Environment, Water and Agriculture"],
    "Oil & Gas Extraction": ["Ministry of Energy", "Saudi Aramco (state oil company)"],
    "Global Coal Combustion": ["Ministry of Energy"],
    "Cement (Calcination Floor)": ["Ministry of Industry and Mineral Resources"],
    "Water Privatization": ["Saline Water Conversion Corporation", "National Water Company"],
    "Arms Exports": ["Ministry of Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["King Abdullah City for Atomic and Renewable Energy"],
    "Aviation Emissions": ["General Authority of Civil Aviation"],
    "Algorithmic Pricing": ["General Authority for Competition"],
    "Big Tech Platform Monopoly": ["General Authority for Competition"],
    "Bitcoin Proof-of-Work": ["Saudi Central Bank"],
    "Gig Economy Platforms": ["Ministry of Human Resources and Social Development"],
    "Nuclear Fission": ["King Abdullah City for Atomic and Renewable Energy"],
    "Deep-Sea Mining (Abyssal Floor)": ["Saudi Geological Survey"],
    "Opioid Ecosystem": ["Saudi Food and Drug Authority"],
    "Global Fisheries": ["Ministry of Environment, Water and Agriculture"],
  }
},

"Syria": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Agrarian Reform"],
    "Oil & Gas Extraction": ["General Petroleum Corporation"],
    "Water Privatization": ["Ministry of Water Resources"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Syrian Civil Aviation Authority"],
    "Industrial Monoculture": ["Ministry of Agriculture and Agrarian Reform"],
  }
},

"United Arab Emirates": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Health and Prevention"],
    "Ultra-Processed Food": ["Ministry of Health and Prevention", "Emirates Authority for Standardization and Metrology"],
    "Oil & Gas Extraction": ["Abu Dhabi National Oil Company", "Ministry of Energy and Infrastructure"],
    "Water Privatization": ["Federal Electricity and Water Authority"],
    "Cement (Calcination Floor)": ["Ministry of Climate Change and Environment"],
    "Arms Exports": ["Ministry of Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["Federal Authority for Nuclear Regulation"],
    "Aviation Emissions": ["General Civil Aviation Authority"],
    "Algorithmic Pricing": ["Ministry of Economy"],
    "Big Tech Platform Monopoly": ["Ministry of Economy"],
    "Bitcoin Proof-of-Work": ["Securities and Commodities Authority", "Central Bank of the UAE"],
    "Gig Economy Platforms": ["Ministry of Human Resources and Emiratisation"],
    "Nuclear Fission": ["Federal Authority for Nuclear Regulation", "Emirates Nuclear Energy Corporation"],
    "Proof of Stake Protocols": ["Securities and Commodities Authority"],
    "Commercial Gambling": ["Gambling is illegal under federal law"],
    "Global Fisheries": ["Ministry of Climate Change and Environment"],
  }
},

"Yemen": {
  region: "Middle East",
  domains: {
    "Tobacco": ["Ministry of Public Health and Population"],
    "Ultra-Processed Food": ["Ministry of Public Health and Population"],
    "Topsoil Erosion": ["Ministry of Agriculture and Irrigation"],
    "Oil & Gas Extraction": ["Ministry of Oil and Minerals"],
    "Water Privatization": ["National Water Resources Authority"],
    "Global Fisheries": ["Ministry of Fish Wealth"],
    "Arms Exports": ["Ministry of Defence"],
    "Aviation Emissions": ["Civil Aviation and Meteorology Authority"],
  }
},

// ═══════════════════════════════════════════════════════════════
// OCEANIA — 14 countries
// ═══════════════════════════════════════════════════════════════

"Australia": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Department of Health and Aged Care", "Therapeutic Goods Administration"],
    "Ultra-Processed Food": ["Food Standards Australia New Zealand", "Department of Health and Aged Care"],
    "Topsoil Erosion": ["Department of Agriculture, Fisheries and Forestry"],
    "Oil & Gas Extraction": ["National Offshore Petroleum Safety and Environmental Management Authority", "Department of Industry, Science and Resources"],
    "Global Coal Combustion": ["Department of Climate Change, Energy, the Environment and Water"],
    "Cement (Calcination Floor)": ["Clean Energy Regulator"],
    "Water Privatization": ["Bureau of Meteorology (water information)", "State and territory water authorities"],
    "Forever Chemicals (PFAS)": ["Department of Climate Change, Energy, the Environment and Water"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Department of Climate Change, Energy, the Environment and Water"],
    "Global Fisheries": ["Australian Fisheries Management Authority"],
    "Industrial Monoculture": ["Department of Agriculture, Fisheries and Forestry"],
    "Arms Exports": ["Defence Export Controls", "Department of Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["Australian Safeguards and Non-Proliferation Office"],
    "Orbital Debris (Kessler Ceiling)": ["Australian Space Agency"],
    "Gene Drives (Ecological Ratchet)": ["Office of the Gene Technology Regulator"],
    "Aviation Emissions": ["Civil Aviation Safety Authority"],
    "Opioid Ecosystem": ["Therapeutic Goods Administration", "Australian Criminal Intelligence Commission"],
    "Commercial Gambling": ["Australian Communications and Media Authority", "State and territory gambling regulators"],
    "Algorithmic Pricing": ["Australian Competition and Consumer Commission"],
    "Big Tech Platform Monopoly": ["Australian Competition and Consumer Commission", "Australian Communications and Media Authority"],
    "Bitcoin Proof-of-Work": ["Australian Securities and Investments Commission", "Australian Transaction Reports and Analysis Centre"],
    "Gig Economy Platforms": ["Fair Work Commission", "Fair Work Ombudsman"],
    "Nuclear Fission": ["Australian Radiation Protection and Nuclear Safety Agency"],
    "Commercial Real Estate Urban Hollowing": ["State and territory planning departments"],
    "Deep-Sea Mining (Abyssal Floor)": ["Geoscience Australia"],
    "Student Loan Securitization": ["Department of Education (HECS-HELP system)"],
    "Pharmacy Benefit Managers": ["Pharmaceutical Benefits Scheme Advisory Committee"],
    "Proof of Stake Protocols": ["Australian Securities and Investments Commission"],
    "Palm Oil Deforestation": ["Department of Climate Change, Energy, the Environment and Water"],
  }
},

"Fiji": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health and Medical Services"],
    "Ultra-Processed Food": ["Ministry of Health and Medical Services"],
    "Topsoil Erosion": ["Ministry of Agriculture"],
    "Global Fisheries": ["Ministry of Fisheries"],
    "Water Privatization": ["Water Authority of Fiji"],
    "Aviation Emissions": ["Civil Aviation Authority of Fiji"],
    "Industrial Monoculture": ["Ministry of Agriculture"],
    "Deep-Sea Mining (Abyssal Floor)": ["Department of Mineral Resources"],
    "Algorithmic Pricing": ["Fijian Competition and Consumer Commission"],
  }
},

"Kiribati": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health and Medical Services"],
    "Ultra-Processed Food": ["Ministry of Health and Medical Services"],
    "Global Fisheries": ["Ministry of Fisheries and Marine Resource Development"],
    "Water Privatization": ["Public Utilities Board"],
    "Aviation Emissions": ["Civil Aviation Division"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Fisheries and Marine Resource Development"],
  }
},

"Marshall Islands": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health and Human Services"],
    "Ultra-Processed Food": ["Ministry of Health and Human Services"],
    "Global Fisheries": ["Marshall Islands Marine Resources Authority"],
    "Water Privatization": ["Majuro Water and Sewer Company"],
    "Aviation Emissions": ["Civil Aviation Division"],
    "Deep-Sea Mining (Abyssal Floor)": ["Marshall Islands Marine Resources Authority"],
    "Nuclear Fission": ["Republic of Marshall Islands (legacy of nuclear testing at Bikini and Enewetak atolls)"],
  }
},

"Micronesia": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Department of Health and Social Affairs"],
    "Ultra-Processed Food": ["Department of Health and Social Affairs"],
    "Global Fisheries": ["National Oceanic Resource Management Authority"],
    "Water Privatization": ["State water utilities"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Deep-Sea Mining (Abyssal Floor)": ["National Oceanic Resource Management Authority"],
  }
},

"Nauru": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Department of Health"],
    "Ultra-Processed Food": ["Department of Health"],
    "Global Fisheries": ["Nauru Fisheries and Marine Resources Authority"],
    "Water Privatization": ["Nauru Utilities Corporation"],
    "Aviation Emissions": ["Civil Aviation Authority"],
    "Deep-Sea Mining (Abyssal Floor)": ["Nauru Ocean Resources (sponsor of deep-sea mining exploration)"],
  }
},

"New Zealand": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health (Smokefree Environments Act)"],
    "Ultra-Processed Food": ["Food Standards Australia New Zealand", "Ministry for Primary Industries"],
    "Topsoil Erosion": ["Ministry for Primary Industries"],
    "Water Privatization": ["Department of Internal Affairs (Three Waters reform)", "Taumata Arowai (water services regulator)"],
    "Forever Chemicals (PFAS)": ["Ministry for the Environment"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Ministry for the Environment", "Environmental Protection Authority"],
    "Global Fisheries": ["Ministry for Primary Industries"],
    "Industrial Monoculture": ["Ministry for Primary Industries"],
    "Arms Exports": ["Ministry of Foreign Affairs and Trade (export controls)"],
    "Aviation Emissions": ["Civil Aviation Authority of New Zealand"],
    "Opioid Ecosystem": ["Medicines and Medical Devices Safety Authority"],
    "Algorithmic Pricing": ["Commerce Commission"],
    "Big Tech Platform Monopoly": ["Commerce Commission"],
    "Gig Economy Platforms": ["Ministry of Business, Innovation and Employment"],
    "Nuclear Fission": ["New Zealand is nuclear-free by law (Nuclear Free Zone, Disarmament, and Arms Control Act 1987)"],
    "Gene Drives (Ecological Ratchet)": ["Environmental Protection Authority"],
    "Deep-Sea Mining (Abyssal Floor)": ["Environmental Protection Authority"],
    "Pharmacy Benefit Managers": ["Pharmaceutical Management Agency"],
    "Bitcoin Proof-of-Work": ["Financial Markets Authority"],
  }
},

"Palau": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Bureau of Marine Resources"],
    "Water Privatization": ["Palau Water and Sewer Corporation (planned)"],
    "Aviation Emissions": ["Bureau of Aviation"],
    "Deep-Sea Mining (Abyssal Floor)": ["Bureau of Marine Resources"],
  }
},

"Papua New Guinea": {
  region: "Oceania",
  domains: {
    "Tobacco": ["National Department of Health"],
    "Ultra-Processed Food": ["National Department of Health"],
    "Topsoil Erosion": ["Department of Agriculture and Livestock"],
    "Oil & Gas Extraction": ["Department of Petroleum and Energy"],
    "Water Privatization": ["Water PNG (state water authority)"],
    "Global Fisheries": ["National Fisheries Authority"],
    "Industrial Monoculture": ["Department of Agriculture and Livestock"],
    "Palm Oil Deforestation": ["Papua New Guinea Forest Authority"],
    "Deep-Sea Mining (Abyssal Floor)": ["Mineral Resources Authority"],
    "Arms Exports": ["Department of Defence"],
    "Aviation Emissions": ["Civil Aviation Safety Authority of Papua New Guinea"],
    "Global Coal Combustion": ["Department of Petroleum and Energy"],
  }
},

"Samoa": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Ministry of Agriculture and Fisheries"],
    "Global Fisheries": ["Ministry of Agriculture and Fisheries"],
    "Water Privatization": ["Samoa Water Authority"],
    "Aviation Emissions": ["Ministry of Works, Transport and Infrastructure"],
  }
},

"Solomon Islands": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health and Medical Services"],
    "Ultra-Processed Food": ["Ministry of Health and Medical Services"],
    "Topsoil Erosion": ["Ministry of Agriculture and Livestock"],
    "Global Fisheries": ["Ministry of Fisheries and Marine Resources"],
    "Water Privatization": ["Solomon Islands Water Authority"],
    "Palm Oil Deforestation": ["Ministry of Forestry and Research"],
    "Aviation Emissions": ["Civil Aviation Authority of the Solomon Islands"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Mines, Energy and Rural Electrification"],
  }
},

"Tonga": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Ministry of Fisheries"],
    "Water Privatization": ["Tonga Water Board"],
    "Aviation Emissions": ["Ministry of Infrastructure"],
    "Deep-Sea Mining (Abyssal Floor)": ["Ministry of Lands and Natural Resources"],
  }
},

"Tuvalu": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Global Fisheries": ["Fisheries Department"],
    "Water Privatization": ["Public Works Department"],
    "Aviation Emissions": ["Civil Aviation Authority"],
  }
},

"Vanuatu": {
  region: "Oceania",
  domains: {
    "Tobacco": ["Ministry of Health"],
    "Ultra-Processed Food": ["Ministry of Health"],
    "Topsoil Erosion": ["Department of Agriculture and Rural Development"],
    "Global Fisheries": ["Vanuatu Fisheries Department"],
    "Water Privatization": ["Department of Water Resources"],
    "Aviation Emissions": ["Civil Aviation Authority of Vanuatu"],
    "Deep-Sea Mining (Abyssal Floor)": ["Department of Geology and Mines"],
  }
},

// ═══════════════════════════════════════════════════════════════
// OBSERVER STATE
// ═══════════════════════════════════════════════════════════════

"United States": {
  region: "Americas",
  domains: {
    "Tobacco": ["Food and Drug Administration (FDA)", "Bureau of Alcohol, Tobacco, Firearms and Explosives"],
    "Ultra-Processed Food": ["Food and Drug Administration (FDA)", "US Department of Agriculture (USDA)"],
    "Topsoil Erosion": ["US Department of Agriculture (USDA)", "Natural Resources Conservation Service"],
    "Oil & Gas Extraction": ["Department of Energy", "Bureau of Ocean Energy Management", "Environmental Protection Agency (EPA)"],
    "Global Coal Combustion": ["Environmental Protection Agency (EPA)", "Department of Energy"],
    "Cement (Calcination Floor)": ["Environmental Protection Agency (EPA)"],
    "Water Privatization": ["Environmental Protection Agency (EPA)", "State public utility commissions"],
    "Forever Chemicals (PFAS)": ["Environmental Protection Agency (EPA)"],
    "Persistent Organic Pollutants Beyond Forever Chemicals": ["Environmental Protection Agency (EPA)"],
    "Global Fisheries": ["National Oceanic and Atmospheric Administration (NOAA)", "National Marine Fisheries Service"],
    "Industrial Monoculture": ["US Department of Agriculture (USDA)"],
    "Palm Oil Deforestation": ["US Trade Representative", "Environmental Protection Agency (EPA)"],
    "Arms Exports": ["Department of State (Directorate of Defense Trade Controls)", "Department of Defence"],
    "Weapons of Mass Destruction Capability Diffusion": ["Department of Energy (National Nuclear Security Administration)", "Department of State"],
    "Orbital Debris (Kessler Ceiling)": ["National Aeronautics and Space Administration (NASA)", "Federal Communications Commission (FCC)", "Department of Commerce (Office of Space Commerce)"],
    "Gene Drives (Ecological Ratchet)": ["Environmental Protection Agency (EPA)", "US Department of Agriculture (USDA)", "Food and Drug Administration (FDA)"],
    "Aviation Emissions": ["Federal Aviation Administration (FAA)", "Environmental Protection Agency (EPA)"],
    "Opioid Ecosystem": ["Drug Enforcement Administration (DEA)", "Food and Drug Administration (FDA)", "Substance Abuse and Mental Health Services Administration"],
    "Commercial Gambling": ["State gaming commissions", "National Indian Gaming Commission"],
    "Algorithmic Pricing": ["Federal Trade Commission (FTC)", "Department of Justice (Antitrust Division)"],
    "Big Tech Platform Monopoly": ["Federal Trade Commission (FTC)", "Department of Justice (Antitrust Division)", "Federal Communications Commission (FCC)"],
    "Bitcoin Proof-of-Work": ["Securities and Exchange Commission (SEC)", "Commodity Futures Trading Commission (CFTC)"],
    "Gig Economy Platforms": ["Department of Labor", "National Labor Relations Board"],
    "Nuclear Fission": ["Nuclear Regulatory Commission (NRC)", "Department of Energy"],
    "Commercial Real Estate Urban Hollowing": ["Federal Reserve", "Office of the Comptroller of the Currency", "Federal Deposit Insurance Corporation"],
    "Deep-Sea Mining (Abyssal Floor)": ["National Oceanic and Atmospheric Administration (NOAA)", "Bureau of Ocean Energy Management"],
    "Student Loan Securitization": ["Department of Education", "Consumer Financial Protection Bureau"],
    "Pharmacy Benefit Managers": ["Federal Trade Commission (FTC)", "Centers for Medicare and Medicaid Services"],
    "Proof of Stake Protocols": ["Securities and Exchange Commission (SEC)", "Commodity Futures Trading Commission (CFTC)"],
  }
},

"Holy See (Vatican City)": {
  region: "Europe",
  domains: {
    "Tobacco": ["Directorate of Health and Hygiene"],
    "Arms Exports": ["The Holy See advocates for nuclear disarmament and arms control through diplomatic channels"],
    "Weapons of Mass Destruction Capability Diffusion": ["Dicastery for Promoting Integral Human Development (nuclear disarmament advocacy)"],
  }
},

};

export default COUNTRY_REGULATORS;
