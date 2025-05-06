import { Table, Title } from "@mantine/core";

function yourtickets() {
    const elements = [
        { position: 1, mass: 1.008, symbol: "H", name: "Hydrogen" },
        { position: 2, mass: 4.0026, symbol: "He", name: "Helium" },
        { position: 3, mass: 6.94, symbol: "Li", name: "Lithium" },
        { position: 4, mass: 9.0122, symbol: "Be", name: "Beryllium" },
        { position: 5, mass: 10.81, symbol: "B", name: "Boron" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 8, mass: 15.999, symbol: "O", name: "Oxygen" },
        { position: 9, mass: 18.998, symbol: "F", name: "Fluorine" },
        { position: 10, mass: 20.18, symbol: "Ne", name: "Neon" },
        { position: 11, mass: 22.99, symbol: "Na", name: "Sodium" },
        { position: 12, mass: 24.305, symbol: "Mg", name: "Magnesium" },
        { position: 13, mass: 26.982, symbol: "Al", name: "Aluminum" },
        { position: 14, mass: 28.085, symbol: "Si", name: "Silicon" },
        { position: 15, mass: 30.974, symbol: "P", name: "Phosphorus" },
        { position: 16, mass: 32.06, symbol: "S", name: "Sulfur" },
        { position: 17, mass: 35.45, symbol: "Cl", name: "Chlorine" },
        { position: 18, mass: 39.948, symbol: "Ar", name: "Argon" },
        { position: 19, mass: 39.098, symbol: "K", name: "Potassium" },
        { position: 20, mass: 40.078, symbol: "Ca", name: "Calcium" },
        { position: 21, mass: 44.956, symbol: "Sc", name: "Scandium" },
        { position: 22, mass: 47.867, symbol: "Ti", name: "Titanium" },
        { position: 23, mass: 50.942, symbol: "V", name: "Vanadium" },
        { position: 24, mass: 51.996, symbol: "Cr", name: "Chromium" },
        { position: 25, mass: 54.938, symbol: "Mn", name: "Manganese" },
        { position: 26, mass: 55.845, symbol: "Fe", name: "Iron" },
        { position: 27, mass: 58.933, symbol: "Co", name: "Cobalt" },
        { position: 28, mass: 58.69, symbol: "Ni", name: "Nickel" },
        { position: 29, mass: 63.546, symbol: "Cu", name: "Copper" },
        { position: 30, mass: 65.38, symbol: "Zn", name: "Zinc" },
        { position: 31, mass: 69.723, symbol: "Ga", name: "Gallium" },
        { position: 32, mass: 72.63, symbol: "Ge", name: "Germanium" },
        { position: 33, mass: 74.922, symbol: "As", name: "Arsenic" },
        { position: 34, mass: 78.96, symbol: "Se", name: "Selenium" },
        { position: 35, mass: 79.904, symbol: "Br", name: "Bromine" },
        { position: 36, mass: 83.798, symbol: "Kr", name: "Krypton" },
        { position: 37, mass: 85.468, symbol: "Rb", name: "Rubidium" },
        { position: 38, mass: 87.62, symbol: "Sr", name: "Strontium" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 40, mass: 91.224, symbol: "Zr", name: "Zirconium" },
        { position: 41, mass: 92.906, symbol: "Nb", name: "Niobium" },
        { position: 42, mass: 95.95, symbol: "Mo", name: "Molybdenum" },
        { position: 43, mass: 98, symbol: "Tc", name: "Technetium" },
        { position: 44, mass: 101.07, symbol: "Ru", name: "Ruthenium" },
        { position: 45, mass: 102.91, symbol: "Rh", name: "Rhodium" },
        { position: 46, mass: 106.42, symbol: "Pd", name: "Palladium" },
        { position: 47, mass: 107.87, symbol: "Ag", name: "Silver" },
        { position: 48, mass: 112.41, symbol: "Cd", name: "Cadmium" },
        { position: 49, mass: 114.82, symbol: "In", name: "Indium" },
        { position: 50, mass: 118.71, symbol: "Sn", name: "Tin" },
        { position: 51, mass: 121.76, symbol: "Sb", name: "Antimony" },
        { position: 52, mass: 127.6, symbol: "Te", name: "Tellurium" },
        { position: 53, mass: 126.9, symbol: "I", name: "Iodine" },
        { position: 54, mass: 131.29, symbol: "Xe", name: "Xenon" },
        { position: 55, mass: 132.91, symbol: "Cs", name: "Cesium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 57, mass: 138.91, symbol: "La", name: "Lanthanum" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 59, mass: 140.91, symbol: "Pr", name: "Praseodymium" },
        { position: 60, mass: 144.24, symbol: "Nd", name: "Neodymium" },
        { position: 61, mass: 145, symbol: "Pm", name: "Promethium" },
        { position: 62, mass: 150.36, symbol: "Sm", name: "Samarium" },
        { position: 63, mass: 151.96, symbol: "Eu", name: "Europium" },
        { position: 64, mass: 157.25, symbol: "Gd", name: "Gadolinium" },
        { position: 65, mass: 158.93, symbol: "Tb", name: "Terbium" },
        { position: 66, mass: 162.5, symbol: "Dy", name: "Dysprosium" },
        { position: 67, mass: 164.93, symbol: "Ho", name: "Holmium" },
        { position: 68, mass: 167.26, symbol: "Er", name: "Erbium" },
        { position: 69, mass: 168.93, symbol: "Tm", name: "Thulium" },
        { position: 70, mass: 173.05, symbol: "Yb", name: "Ytterbium" },
        { position: 71, mass: 174.97, symbol: "Lu", name: "Lutetium" },
        { position: 72, mass: 178.49, symbol: "Hf", name: "Hafnium" },
        { position: 73, mass: 180.95, symbol: "Ta", name: "Tantalum" },
        { position: 74, mass: 183.84, symbol: "W", name: "Tungsten" },
        { position: 75, mass: 186.21, symbol: "Re", name: "Rhenium" },
        { position: 76, mass: 190.23, symbol: "Os", name: "Osmium" },
        { position: 77, mass: 192.22, symbol: "Ir", name: "Iridium" },
        { position: 78, mass: 195.08, symbol: "Pt", name: "Platinum" },
        { position: 79, mass: 196.97, symbol: "Au", name: "Gold" },
        { position: 80, mass: 200.59, symbol: "Hg", name: "Mercury" },
        { position: 81, mass: 204.38, symbol: "Tl", name: "Thallium" },
        { position: 82, mass: 207.2, symbol: "Pb", name: "Lead" },
        { position: 83, mass: 208.98, symbol: "Bi", name: "Bismuth" },
        { position: 84, mass: 209, symbol: "Po", name: "Polonium" },
        { position: 85, mass: 210, symbol: "At", name: "Astatine" },
        { position: 86, mass: 222, symbol: "Rn", name: "Radon" },
        { position: 87, mass: 223, symbol: "Fr", name: "Francium" },
        { position: 88, mass: 226, symbol: "Ra", name: "Radium" },
        { position: 89, mass: 227, symbol: "Ac", name: "Actinium" },
        { position: 90, mass: 232.04, symbol: "Th", name: "Thorium" },
        { position: 91, mass: 231.04, symbol: "Pa", name: "Protactinium" },
        { position: 92, mass: 238.03, symbol: "U", name: "Uranium" },
        { position: 93, mass: 237, symbol: "Np", name: "Neptunium" },
        { position: 94, mass: 244, symbol: "Pu", name: "Plutonium" },
        { position: 95, mass: 243, symbol: "Am", name: "Americium" },
        { position: 96, mass: 247, symbol: "Cm", name: "Curium" },
        { position: 97, mass: 247, symbol: "Bk", name: "Berkelium" },
        { position: 98, mass: 251, symbol: "Cf", name: "Californium" },
        { position: 99, mass: 252, symbol: "Es", name: "Einsteinium" },
        { position: 100, mass: 257, symbol: "Fm", name: "Fermium" },
        { position: 101, mass: 258, symbol: "Md", name: "Mendelevium" },
        { position: 102, mass: 259, symbol: "No", name: "Nobelium" },
        { position: 103, mass: 262, symbol: "Lr", name: "Lawrencium" },
        { position: 104, mass: 267, symbol: "Rf", name: "Rutherfordium" },
        { position: 105, mass: 270, symbol: "Db", name: "Dubnium" },
        { position: 106, mass: 271, symbol: "Sg", name: "Seaborgium" },
        { position: 107, mass: 270, symbol: "Bh", name: "Bohrium" },
        { position: 108, mass: 277, symbol: "Hs", name: "Hassium" },
        { position: 109, mass: 286, symbol: "Mt", name: "Meitnerium" },
        { position: 110, mass: 289, symbol: "Ds", name: "Darmstadtium" },
        { position: 111, mass: 293, symbol: "Rg", name: "Roentgenium" },
        { position: 112, mass: 294, symbol: "Cn", name: "Copernicium" },
        { position: 113, mass: 286, symbol: "Nh", name: "Nihonium" },
        { position: 114, mass: 289, symbol: "Fl", name: "Flerovium" },
        { position: 115, mass: 290, symbol: "Mc", name: "Moscovium" },
        { position: 116, mass: 293, symbol: "Lv", name: "Livermorium" },
        { position: 117, mass: 294, symbol: "Ts", name: "Tennessine" },
        { position: 118, mass: 294, symbol: "Og", name: "Oganesson" },
    ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.position}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Title order={2} mb={10}>
                Your Tickets
            </Title>
            <Table.ScrollContainer minWidth={500} h={100}>
                <Table stickyHeader>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Element position</Table.Th>
                            <Table.Th>Element name</Table.Th>
                            <Table.Th>Symbol</Table.Th>
                            <Table.Th>Atomic mass</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
}

export default yourtickets;
