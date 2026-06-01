import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Remove os dados antigos respeitando a ordem das chaves estrangeiras
    await knex("order_items").del();
    await knex("customer_product_favorites").del();
    await knex("products").del();

    // Insere a lista com 20 produtos divididos em 6 categorias claras
    await knex("products").insert([
        // CATEGORIA 1: ALIMENTAÇÃO & PETISCOS
        // CATEGORIA 2: SAÚDE & FARMÁCIA
        // CATEGORIA 3: HIGIENE & ESTÉTICA
        // CATEGORIA 4: BRINQUEDOS
        // CATEGORIA 5: ACESSÓRIOS & CONFORTO (Coleiras, Guias, Camas e Comedouros)
        // CATEGORIA 6: HABITATS & CASAS

        {
            id: 1,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Premium Especial Cães Adultos Frango 15kg",
            description:
                "Alimento completo para cães adultos de porte médio e grande. Rico em ômega 3 e 6 para pelos brilhantes.",
            current_price: "189.90",
            stock_quantity: 45,
            updated_at: knex.fn.now(),
        },
        {
            id: 2,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Seca para Gatos Castrados Salmão 3kg",
            description:
                "Formulada especialmente para gatos castrados. Auxilia no controle do peso e na manutenção da saúde urinária.",
            current_price: "74.50",
            stock_quantity: 30,
            updated_at: knex.fn.now(),
        },
        {
            id: 3,
            merchant_id: 1,
            category_id: 1,
            name: "Petisco Bifinho para Cães Sabor Carne 60g",
            description:
                "Snack saboroso e macio, ideal para momentos de agrado, adestramento e recompensa para o seu cão.",
            current_price: "6.90",
            stock_quantity: 150,
            updated_at: knex.fn.now(),
        },
        {
            id: 4,
            merchant_id: 1,
            category_id: 1,
            name: "Ração para Peixes Tropicais em Flocos 50g",
            description:
                "Alimento completo em flocos para todas as espécies de peixes ornamentais tropicais de aquário.",
            current_price: "19.90",
            stock_quantity: 65,
            updated_at: knex.fn.now(),
        },
        {
            id: 5,
            merchant_id: 1,
            category_id: 1,
            name: "Mistura de Sementes Selecionadas para Calopsita 500g",
            description:
                "Alimento balanceado com sementes e grãos limpos e selecionados, ideal para o dia a dia de calopsitas.",
            current_price: "14.80",
            stock_quantity: 80,
            updated_at: knex.fn.now(),
        },

        {
            id: 6,
            merchant_id: 1,
            category_id: 2,
            name: "Antipulgas e Carrapatos Transdérmico (Cães 10 a 20kg)",
            description:
                "Pipeta de aplicação única no dorso. Proteção eficaz, de ação rápida e durabilidade de até 30 dias.",
            current_price: "89.00",
            stock_quantity: 50,
            updated_at: knex.fn.now(),
        },
        {
            id: 7,
            merchant_id: 1,
            category_id: 2,
            name: "Suplemento Vitamínico para Cães e Gatos Gotas 30ml",
            description:
                "Suplemento alimentar rico em vitaminas do complexo B e aminoácidos. Indicado para estimular o apetite.",
            current_price: "32.90",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },

        {
            id: 8,
            merchant_id: 2,
            category_id: 3,
            name: "Shampoo Neutro Hidratante para Pets 500ml",
            description:
                "Fórmula suave com extrato natural de aloe vera e aveia. Higieniza enquanto hidrata a pele e os pelos.",
            current_price: "28.90",
            stock_quantity: 35,
            updated_at: knex.fn.now(),
        },
        {
            id: 9,
            merchant_id: 2,
            category_id: 3,
            name: "Educador Sanitário Pode / Não Pode Kit Duplo",
            description:
                "Kit com dois sprays: um atrativo sanitário para o local certo e um repelente para demarcar locais proibidos.",
            current_price: "45.00",
            stock_quantity: 25,
            updated_at: knex.fn.now(),
        },
        {
            id: 10,
            merchant_id: 2,
            category_id: 3,
            name: "Areia Sanitária Silica Premium para Gatos 1.6kg",
            description:
                "Cristais de sílica com altíssimo poder de absorção de líquidos e eliminação de odores.",
            current_price: "54.90",
            stock_quantity: 70,
            updated_at: knex.fn.now(),
        },
        {
            id: 11,
            merchant_id: 2,
            category_id: 3,
            name: "Tapete Higiênico Descartável para Cães 30 Unidades",
            description:
                "Tapetes com gel superabsorvente, abas adesivas para fixação no chão e atrativo canino para treinamento.",
            current_price: "62.90",
            stock_quantity: 90,
            updated_at: knex.fn.now(),
        },

        {
            id: 12,
            merchant_id: 2,
            category_id: 4,
            name: "Brinquedo Mordedor Interativo Porta-Petisco",
            description:
                "Mordedor feito de borracha atóxica e resistente. Possui ranhuras que auxiliam na limpeza dos dentes.",
            current_price: "42.90",
            stock_quantity: 60,
            updated_at: knex.fn.now(),
        },
        {
            id: 13,
            merchant_id: 2,
            category_id: 4,
            name: "Brinquedo Lança Bolinhas Automático para Cães",
            description:
                "Brinquedo interativo mecânico que lança bolinhas de tênis a distâncias ajustáveis, ideal para gastar energia.",
            current_price: "199.00",
            stock_quantity: 15,
            updated_at: knex.fn.now(),
        },

        {
            id: 14,
            merchant_id: 3,
            category_id: 5,
            name: "Cama Nuvem Pet Anti-Estresse GG - Cinza",
            description:
                "Cama ultra macia com design redondo de bordas elevadas. Ideal para aliviar a ansiedade.",
            current_price: "134.50",
            stock_quantity: 18,
            updated_at: knex.fn.now(),
        },
        {
            id: 15,
            merchant_id: 3,
            category_id: 5,
            name: "Guia Retrátil Automática Fita 5 Metros",
            description:
                "Guia retrátil com fita de alta resistência para cães de até 25kg. Sistema de trava rápida de um botão.",
            current_price: "49.90",
            stock_quantity: 55,
            updated_at: knex.fn.now(),
        },
        {
            id: 16,
            merchant_id: 3,
            category_id: 5,
            name: "Peitoral Americano com Guia para Cães P - Vermelho",
            description:
                "Peitoral ajustável feito de fita de nylon premium resistente e fechos de segurança com quatro pontos.",
            current_price: "38.00",
            stock_quantity: 30,
            updated_at: knex.fn.now(),
        },
        {
            id: 17,
            merchant_id: 3,
            category_id: 5,
            name: "Comedouro Ergonômico Elevado Duplo de Inox",
            description:
                "Suporte elevado de madeira tratada com duas tigelas de inox removíveis de 400ml. Melhora a postura ao comer.",
            current_price: "79.90",
            stock_quantity: 22,
            updated_at: knex.fn.now(),
        },

        {
            id: 18,
            merchant_id: 2,
            category_id: 6,
            name: "Arranhador para Gatos Torre Luxo com Sisal",
            description:
                "Arranhador em formato de torre com 3 níveis, casinha integrada no térreo e postes para arranhar.",
            current_price: "259.00",
            stock_quantity: 10,
            updated_at: knex.fn.now(),
        },
        {
            id: 19,
            merchant_id: 3,
            category_id: 6,
            name: "Gaiola para Hamster Luxo com Tubos de Acrílico",
            description:
                "Gaiola completa equipada com rodinha de exercícios, comedouro, bebedouro e labirinto externo de tubos.",
            current_price: "169.90",
            stock_quantity: 12,
            updated_at: knex.fn.now(),
        },
        {
            id: 20,
            merchant_id: 3,
            category_id: 6,
            name: "Aquário de Vidro Retangular com Tampa 20 Litros",
            description:
                "Aquário de vidro incolor com acabamento em silicone. Acompanha tampa com corte para fiação e filtros.",
            current_price: "115.00",
            stock_quantity: 8,
            updated_at: knex.fn.now(),
        },
        {
            id: 21,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Super Premium Cães Filhotes Raças Pequenas Sabor Carne 2.5kg",
            description:
                "Nutrição avançada para filhotes. Partículas adaptadas para mandíbulas pequenas, com DHA para o desenvolvimento cerebral.",
            current_price: "92.00",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },
        {
            id: 22,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Úmida Sachê para Gatos Sabor Cordeiro ao Molho 85g",
            description:
                "Alimento úmido altamente palatável para gatos adultos. Ajuda na ingestão diária de água.",
            current_price: "4.20",
            stock_quantity: 300,
            updated_at: knex.fn.now(),
        },
        {
            id: 23,
            merchant_id: 1,
            category_id: 1,
            name: "Petisco Orgânico para Cães Sabor Banana e Aveia 150g",
            description:
                "Snack 100% natural, livre de transgênicos e corantes artificiais. Saudável e crocante.",
            current_price: "18.90",
            stock_quantity: 95,
            updated_at: knex.fn.now(),
        },
        {
            id: 24,
            merchant_id: 2,
            category_id: 1,
            name: "Ração para Coelhos e Pequenos Roedores com Alfafa 1kg",
            description:
                "Mistura balanceada com pellets extrusados e alfafa desidratada. Promove o desgaste correto dos dentes.",
            current_price: "24.90",
            stock_quantity: 50,
            updated_at: knex.fn.now(),
        },
        {
            id: 25,
            merchant_id: 1,
            category_id: 1,
            name: "Ração de Alta Performance para Cães Atletas Frango e Arroz 20kg",
            description:
                "Formulação com alta densidade energética para cães de trabalho ou que praticam esportes. Rica em proteínas.",
            current_price: "249.90",
            stock_quantity: 15,
            updated_at: knex.fn.now(),
        },
        {
            id: 26,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Seca Gatos Castrados Sabor Truta e Aveia 7.5kg",
            description:
                "Nutrição equilibrada com calorias reduzidas para controle de peso a longo prazo. Sabor requintado.",
            current_price: "165.00",
            stock_quantity: 20,
            updated_at: knex.fn.now(),
        },
        {
            id: 27,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Úmida Lata Cães Adultos Patê de Frango 280g",
            description:
                "Patê cozido ao vapor, rico em vitaminas. Pode ser misturado à ração seca para estimular o apetite.",
            current_price: "12.50",
            stock_quantity: 120,
            updated_at: knex.fn.now(),
        },
        {
            id: 28,
            merchant_id: 1,
            category_id: 1,
            name: "Petisco Funcional para Cães Controle de Tártaro 7 Unidades",
            description:
                "Snack mastigável com formato em X que limpa os dentes até a gengiva através da mastigação.",
            current_price: "21.90",
            stock_quantity: 110,
            updated_at: knex.fn.now(),
        },
        {
            id: 29,
            merchant_id: 1,
            category_id: 1,
            name: "Ração para Tartarugas Aquáticas em Bastões 100g",
            description:
                "Alimento flutuante enriquecido com cálcio e vitamina D3, essencial para o fortalecimento da carapaça.",
            current_price: "34.90",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },
        {
            id: 30,
            merchant_id: 1,
            category_id: 1,
            name: "Ração Especial para Cães Idosos (+7 anos) Raças Médias 10kg",
            description:
                "Contém glicosamina e condroitina para proteção das articulações de cães na terceira idade.",
            current_price: "159.00",
            stock_quantity: 25,
            updated_at: knex.fn.now(),
        },
        {
            id: 31,
            merchant_id: 1,
            category_id: 2,
            name: "Antipulgas e Carrapatos Mastigável (Cães 4.5 a 10kg) 1 Comprimido",
            description:
                "Tablete mastigável sabor carne de ação rápida. Protege o cão por até 12 semanas completas.",
            current_price: "145.00",
            stock_quantity: 60,
            updated_at: knex.fn.now(),
        },
        {
            id: 32,
            merchant_id: 1,
            category_id: 2,
            name: "Suplemento Condroprotetor Articular Cães Exigentes 60 Tabletes",
            description:
                "Suplemento focado na saúde das articulações de cães de grande porte e atletas. Previne o desgaste precoce.",
            current_price: "119.90",
            stock_quantity: 30,
            updated_at: knex.fn.now(),
        },
        {
            id: 33,
            merchant_id: 1,
            category_id: 2,
            name: "Spray Antisséptico e Cicatrizante Dermatológico Pets 100ml",
            description:
                "Indicado para tratamento de feridas, queimaduras e pós-operatórios em cães e gatos. Não arde.",
            current_price: "39.90",
            stock_quantity: 45,
            updated_at: knex.fn.now(),
        },
        {
            id: 34,
            merchant_id: 1,
            category_id: 2,
            name: "Gel Dental para Cães Sabor Menta 50g",
            description:
                "Higienizador bucal que dispensa enxágue. Ajuda a combater o mau hálito e remove placas bacterianas antigas.",
            current_price: "22.00",
            stock_quantity: 75,
            updated_at: knex.fn.now(),
        },
        {
            id: 35,
            merchant_id: 1,
            category_id: 2,
            name: "Coleira Antiparasitária para Cães Médios e Grandes (65cm)",
            description:
                "Coleira repellent de pulgas, carrapatos e mosquitos transmissores da Leishmaniose. Proteção por até 8 meses.",
            current_price: "189.00",
            stock_quantity: 25,
            updated_at: knex.fn.now(),
        },
        {
            id: 36,
            merchant_id: 1,
            category_id: 2,
            name: "Solução Otológica Limpeza de Ouvidos de Cães e Gatos 120ml",
            description:
                "Remove o excesso de cerúmen e elimina odores desagradáveis no conduto auditivo. Previne otites.",
            current_price: "44.50",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },
        {
            id: 37,
            merchant_id: 1,
            category_id: 2,
            name: "Eliminador de Bolas de Pelo para Gatos Pasta Palatável 70g",
            description:
                "Suplemento em pasta sabor malte que auxilia na evacuação natural das bolas de pelo ingeridas pelos felinos.",
            current_price: "52.90",
            stock_quantity: 50,
            updated_at: knex.fn.now(),
        },
        {
            id: 38,
            merchant_id: 1,
            category_id: 2,
            name: "Calmante Natural para Cães e Gatos 30 Cápsulas",
            description:
                "Formulado com triptofano e camomila. Ideal para acalmar o pet em viagens, queima de fogos de artifício ou mudanças.",
            current_price: "58.00",
            stock_quantity: 35,
            updated_at: knex.fn.now(),
        },

        {
            id: 39,
            merchant_id: 2,
            category_id: 3,
            name: "Shampoo Clareador para Cães de Pelos Brancos 500ml",
            description:
                "Remove manchas amareladas sem agredir ou ressecar a pele. Realça a cor branca natural.",
            current_price: "34.90",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },
        {
            id: 40,
            merchant_id: 2,
            category_id: 3,
            name: "Condicionador Pet Brilho e Maciez Extrato de Mel 500ml",
            description:
                "Desembaraça nós e confere maciez extrema à pelagem longa de cães e gatos.",
            current_price: "31.50",
            stock_quantity: 30,
            updated_at: knex.fn.now(),
        },
        {
            id: 41,
            merchant_id: 2,
            category_id: 3,
            name: "Colônia Pet Fragrância Baby Unissex 120ml",
            description:
                "Perfume suave de longa duração com formulação sem álcool. Não irrita o olfato apurado do animal.",
            current_price: "26.00",
            stock_quantity: 55,
            updated_at: knex.fn.now(),
        },
        {
            id: 42,
            merchant_id: 2,
            category_id: 3,
            name: "Banho a Seco em Spray para Cães e Gatos 250ml",
            description:
                "Ideal para higienização rápida nos intervalos entre os banhos convencionais. Remove odores na hora.",
            current_price: "22.90",
            stock_quantity: 60,
            updated_at: knex.fn.now(),
        },
        {
            id: 43,
            merchant_id: 2,
            category_id: 3,
            name: "Lenços Umedecidos Antissépticos para Pets 100 Unidades",
            description:
                "Lenços espessos e macios, perfeitos para limpar as patas após o passeio, focinho e dobras de pele.",
            current_price: "19.90",
            stock_quantity: 140,
            updated_at: knex.fn.now(),
        },
        {
            id: 44,
            merchant_id: 2,
            category_id: 3,
            name: "Areia Sanitária de Bentonite para Gatos Aroma Lavanda 4kg",
            description:
                "Forma torrões firmes e fáceis de remover instantaneamente. Perfuma sutilmente o ambiente.",
            current_price: "29.90",
            stock_quantity: 110,
            updated_at: knex.fn.now(),
        },
        {
            id: 45,
            merchant_id: 2,
            category_id: 3,
            name: "Banheiro Fechado Caixa de Areia para Gatos Azul",
            description:
                "Caixa de areia fechada com porta vai-e-vem e filtro de carvão ativado. Evita que o felino jogue areia para fora.",
            current_price: "115.00",
            stock_quantity: 12,
            updated_at: knex.fn.now(),
        },

        {
            id: 46,
            merchant_id: 2,
            category_id: 4,
            name: "Brinquedo de Pelúcia Macaco com Apito Interno para Cães",
            description:
                "Pelúcia com costura reforçada e texturas variadas. Emite som ao ser mordido, estimulando o instinto.",
            current_price: "34.50",
            stock_quantity: 45,
            updated_at: knex.fn.now(),
        },
        {
            id: 47,
            merchant_id: 2,
            category_id: 4,
            name: "Corda Mordedor com 3 Nós para Cães Médios Gigante",
            description:
                "Feita de algodão natural. Auxilia no controle do tártaro enquanto o cão se diverte cabo-de-guerra.",
            current_price: "27.90",
            stock_quantity: 80,
            updated_at: knex.fn.now(),
        },
        {
            id: 48,
            merchant_id: 2,
            category_id: 4,
            name: "Brinquedo Varinha com Penas e Catnip para Gatos",
            description:
                "Estimula a agilidade física e mental dos felinos. Possui guizo interno e penas coloridas na ponta.",
            current_price: "15.00",
            stock_quantity: 120,
            updated_at: knex.fn.now(),
        },
        {
            id: 49,
            merchant_id: 2,
            category_id: 4,
            name: "Circuito Interativo de Canaleta com Bola para Gatos",
            description:
                "Brinquedo em blocos montáveis onde a bola corre por dentro. Mantém o gato entretido por horas sozinho.",
            current_price: "68.90",
            stock_quantity: 20,
            updated_at: knex.fn.now(),
        },
        {
            id: 50,
            merchant_id: 2,
            category_id: 4,
            name: "Frango de Borracha Clássico Sonoro Estridente 30cm",
            description:
                "O tradicional brinquedo para pets que emite som divertido ao ser pressionado. Diversão garantida.",
            current_price: "19.90",
            stock_quantity: 100,
            updated_at: knex.fn.now(),
        },

        {
            id: 51,
            merchant_id: 3,
            category_id: 5,
            name: "Capa de Chuva Impermeável para Cães G - Amarela",
            description:
                "Protege o pet nos dias chuvosos. Possui capuz ajustável e faixa reflexiva para passeios noturnos seguros.",
            current_price: "54.00",
            stock_quantity: 25,
            updated_at: knex.fn.now(),
        },
        {
            id: 52,
            merchant_id: 3,
            category_id: 5,
            name: "Fonte de Água Elétrica Tipo Chafariz para Gatos Bivolt 2L",
            description:
                "Estimula felinos e cães a beberem mais água limpa e corrente. Possui filtro triplo de carvão ativo.",
            current_price: "98.90",
            stock_quantity: 16,
            updated_at: knex.fn.now(),
        },
        {
            id: 53,
            merchant_id: 3,
            category_id: 5,
            name: "Suéter de Lã de Tricô para Pets M - Rosa",
            description:
                "Roupinha quente, macia e estilosa para manter cães e gatos aquecidos com conforto durante o inverno.",
            current_price: "45.00",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },
        {
            id: 54,
            merchant_id: 3,
            category_id: 5,
            name: "Coleira de Couro Legítimo com Placa de Identificação Preta",
            description:
                "Acabamento artesanal ultra resistente com fivelas de aço cromado. Elegância e durabilidade.",
            current_price: "62.00",
            stock_quantity: 35,
            updated_at: knex.fn.now(),
        },
        {
            id: 55,
            merchant_id: 3,
            category_id: 5,
            name: "Bolsa de Transporte de Luxo Homologada para Avião Cães/Gatos",
            description:
                "Fundo rígido e telas de ventilação nas laterais. Encaixa perfeitamente embaixo do assento das aeronaves.",
            current_price: "179.90",
            stock_quantity: 14,
            updated_at: knex.fn.now(),
        },

        {
            id: 56,
            merchant_id: 3,
            category_id: 6,
            name: "Casa de Cachorro Plástica Injetada N° 4 Térmica - Azul",
            description:
                "Casinha de alta densidade para quintal. Protege contra frio e calor extremos. Desmontável e lavável.",
            current_price: "210.00",
            stock_quantity: 8,
            updated_at: knex.fn.now(),
        },
        {
            id: 57,
            merchant_id: 3,
            category_id: 6,
            name: "Cama Toca 2 em 1 Iglu para Gatos Estampa Onça",
            description:
                "Pode ser usada fechada como toca quentinha ou dobrada como uma caminha estilosa de bordas macias.",
            current_price: "59.90",
            stock_quantity: 25,
            updated_at: knex.fn.now(),
        },
        {
            id: 58,
            merchant_id: 3,
            category_id: 6,
            name: "Filtro Externo Suspenso Hang-On para Aquários até 50L",
            description:
                "Realiza filtragem química, mecânica e biológica mantendo a água cristalina e oxigenada para os peixes.",
            current_price: "84.00",
            stock_quantity: 15,
            updated_at: knex.fn.now(),
        },
        {
            id: 59,
            merchant_id: 2,
            category_id: 6,
            name: "Arranhador de Sofá Protetor Lateral Canto Kit 2 Unidades",
            description:
                "Placas de carpete e sisal moldadas para encaixar nos cantos de sofás e poltronas, protegendo os estofados.",
            current_price: "46.90",
            stock_quantity: 40,
            updated_at: knex.fn.now(),
        },
        {
            id: 60,
            merchant_id: 3,
            category_id: 6,
            name: "Gaiola Grande para Passarinhos e Canários Teto Plástico",
            description:
                "Espaçosa gaiola de malha fina equipada com poleiros de madeira e bebedouros de encaixe rápido.",
            current_price: "76.50",
            stock_quantity: 18,
            updated_at: knex.fn.now(),
        },
    ]);
}
