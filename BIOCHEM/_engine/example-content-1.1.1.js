/* ===== 1.1.1 Basic Cellular Biology and Genetics ===== */
LO['1.1.1']=[
 'To describe the characteristics of cells',
 'To differentiate prokaryotes, eukaryotes, and viruses',
 'To describe the function, particularly chemical processes in different cellular organelles',
 'To provide an overview of cellular metabolic processes, cell division, and central dogma of molecular biology'
];

add('1.1.1',{id:'111-lo',type:'lo',tier:'core',title:'Learning objectives and map of this section',
 intro:`<p class="small">Your trans lists four learning objectives. Part IV of the trans (Human Genetics) has no LO of its own. But your trans formative quiz and your shifting quiz test it (for example a Tay-Sachs probability question), so it is included here.</p>`});

add('1.1.1',{id:'111-cell',tier:'must',lo:[1],title:'What a cell is and what it can do',html:`
${LEAD('The cell is the basic unit of life. Learn the nine abilities in four groups.')}
${GRID([
 {h:'1. Boundary',c:'p',html:UL(['Enclosed by a <b>plasma membrane</b>','Has systems that link the inside (intracellular) and outside (extracellular) compartments','Contains inorganic and organic molecules'])},
 {h:'2. Energy',c:'y',html:UL(['Changes energy from outside sources into usable energy','Turns nutrients into the parts the cell needs'])},
 {h:'3. Building and cleaning',c:'g',html:UL(['Makes macromolecules: <b>carbohydrates, proteins, lipids, nucleic acids</b>','Removes degraded and toxic material'])},
 {h:'4. Information',c:'r',html:UL(['Can <b>replicate</b>','Holds hereditary information for life processes and reproduction'])}
])}
<p><b>Living or non-living?</b> Your trans says the key difference is reproduction. Living organisms can reproduce on their own. Non-living things can also make energy (for example heat), but they cannot reproduce.</p>
<details class="extra"><summary>Check yourself: what one ability separates living from non-living things?</summary><p>Reproducing on their own.</p></details>
${NOTE('Note on your trans.','Later slides show that a virus fits this rule. It carries genetic information but cannot reproduce alone, so your trans does not call it a living organism.')}
`});

add('1.1.1',{id:'111-domains',tier:'must',tm:true,lo:[2],title:'Three domains of life: Bacteria, Archaea, Eukarya',html:`
${LEAD('Archaea is the in-between domain. Its genes look like Eukarya. Its body looks like Bacteria.')}
${TB(['Feature','Bacteria','Archaea','Eukarya'],[
 ['Nuclear envelope','Absent','Absent','<b>Present</b>'],
 ['Membrane-enclosed organelles','Absent','Absent','<b>Present</b>'],
 ['Peptidoglycan in cell wall','<b>Present</b>','Absent','Absent'],
 ['RNA polymerase','One kind','Several kinds','Several kinds'],
 ['First amino acid of a protein','Formyl-methionine','Methionine','Methionine'],
 ['Introns in genes','Very rare','Some genes','Many genes'],
 ['Histones with DNA','Absent','Some species','Present'],
 ['Circular chromosome','Present','Present','<b>Absent</b>'],
 ['Growth above 100 °C','No','Some species','No']
])}
${XTRA('Original table from your trans (tap to open)',FIG('1.1.1_p02_05+06','Table 1. Comparison of the three domains'))}
<p><b>Two rules to keep:</b> Archaea and Eukarya share <b>genome properties</b> (histones, several RNA polymerases, methionine start, introns). Archaea and Bacteria share <b>physical properties</b> (no organelles, circular DNA).</p>
${ERR('Imprecision in your trans.','The trans says Archaea is the “only domain that can live in extreme environments.” Table 1 says only <i>some</i> Archaea species grow above 100 °C. Use the table wording.')}
`});

add('1.1.1',{id:'111-endo',tier:'core',lo:[2],title:'Where eukaryotes came from: endosymbiotic theory',html:`
${FIGS([FIG('1.1.1_p02_08','Fig 7. Endosymbiotic theory'),FIG('1.1.1_p02_09','Fig 8. Evolution model')])}
${UL([
 'Eukaryotes arose when one prokaryote engulfed another. The engulfed cell became an <b>organelle</b>.',
 'Evidence in <b>mitochondria</b>: they hold their own DNA, different from nuclear DNA. They run their own replication, transcription, and translation. Their central dogma is closer to bacteria.',
 'This is also why mitochondrial DNA comes only from the mother (later slide).'
])}
${ERR('Imprecision in your trans.','The trans says archaea “developed into bacteria.” Its own Fig 8 shows something else: bacteria and archaea both come from an ancestral prokaryote as separate branches, and the mitochondrion comes from the bacteria branch. For the exam: the engulfed cell that became the mitochondrion was a bacterium.')}
`});

add('1.1.1',{id:'111-virus',tier:'must',lo:[2],title:'Viruses: what they have and what they lack',html:`
${LEAD('A virus is genetic information in a protein coat. It cannot reproduce or make protein alone.')}
${UL([
 'Contains <b>either DNA or RNA</b> packed in a <b>capsid</b> (protein coat).',
 'Has <b>no organelles</b> and cannot reproduce by itself.',
 'Depends on a <b>host cell</b> for reproduction and protein synthesis.',
 'Your trans: <b>not considered a living organism</b>. It cannot survive on its own.',
 'Can infect any organism, not only humans (example: avian flu is common in birds).'
])}
${TB(['','Prokaryote','Eukaryote','Virus'],[
 ['Cell?','Yes, no organelles','Yes, nucleus + organelles','<b>No (acellular)</b>'],
 ['Reproduces alone?','Yes','Yes','<b>No, needs host</b>'],
 ['Genetic material','DNA','DNA (in nucleus)','DNA <b>or</b> RNA']
])}
`});

add('1.1.1',{id:'111-prokeuk',tier:'must',lo:[2],title:'Prokaryote vs eukaryote: what is present?',html:`
${LEAD('Prokaryotes lack the nucleus and every membrane-bound organelle. Ribosomes and a cytoskeleton are present in all.')}
${TB(['Structure','Prokaryote','Plant','Animal'],[
 ['Nucleus, nuclear envelope, nucleolus','<b>Absent</b>','Present','Present'],
 ['Mitochondria, ER, Golgi, lysosomes','<b>Absent</b>','Present (lysosomes: absent in most)','Present'],
 ['Ribosomes, cytoskeleton, plasma membrane','Present','Present','Present'],
 ['Chromosomes','Single, circular, no proteins','Many, linear, with proteins','Many, linear, with proteins'],
 ['Cell wall','Present','Present','<b>Absent</b>']
])}
${XTRA('Original Appendix A table from your trans (tap to open)',FIG('1.1.1_p14_56+57','Appendix A. Functions and distribution of cell structures'))}
${DEC('Which structure is present in all eukaryotes but absent in prokaryotes? (cell wall, cilia, nuclear envelope, circular DNA)',null,{asks:'A structure that <b>every</b> eukaryote has and <b>no</b> prokaryote has.',clues:'“All eukaryotes” and “absent in prokaryotes.”',reason:'Cell wall and cilia depend on the organism. Circular DNA is a prokaryote feature. Only the nuclear envelope is universal and eukaryote-only.',trap:'Cell wall. Plants and bacteria have one, but animal cells do not, so it is not in “all eukaryotes.”'})}
`});

add('1.1.1',{id:'111-model',tier:'core',lo:[2],title:'Model organisms: one fact each',html:`
${TB(['Organism','Type','Fact your trans stresses'],[
 ['<i>E. coli</i>','Bacterium, rod-shaped','Most used model. Most human metabolism was worked out on it. Lives in the gut. Fast, easy to handle. <b>Not</b> a eukaryote. Has one <b>circular</b> chromosome.'],
 ['<i>S. cerevisiae</i> (baker’s yeast)','Single-cell fungus, <b>eukaryote</b>','Buds to reproduce. Small genome but does eukaryotic jobs. Closer to animals than plants.'],
 ['<i>C. elegans</i> (worm), <i>Drosophila</i> (fly), <i>Danio</i> (zebrafish), <i>Mus</i> (mouse)','Multicellular animals','Closer to human biochemistry than single cells. Animal models are used before humans for ethical reasons.']
])}
${XTRA('Genome size table (optional)',FIG('1.1.1_p03_10','Table 2. Model organisms and genomes')+`<p class="small">As organisms get more complex, genome size and the number of regulatory genes go up. The number of protein-coding genes does not track this (worm and human both about 20,000).</p>`)}
`});

add('1.1.1',{id:'111-membrane',tier:'core',lo:[3],title:'Plasma membrane',html:`
${FIG('1.1.1_p04_18','Fig 16. Plasma membrane')}
${UL([
 'A <b>lipid bilayer</b> plus <b>membrane proteins</b>, held mainly by non-covalent forces.',
 'Main lipid: <b>phospholipids</b> (for example phosphatidylcholine, phosphatidylethanolamine, phosphatidylserine). The bilayer also holds <b>cholesterol</b>.',
 '<b>Cholesterol = fluidity buffer.</b> Its bulky four rings stop the membrane from freezing at low temperature and from falling apart at high temperature.',
 'The two leaflets are <b>not the same</b> (asymmetric). Phospholipids that carry an apoptosis signal stay on the inner leaflet. They move to the outer leaflet when the cell is going to die.',
 '<b>Glycolipids</b> in the membrane help cells recognise each other.',
 'Membrane proteins can cross the bilayer as a single helix, as multiple helices (multi-pass), or as a barrel of beta sheets.'
])}
<p class="small">Link to 1.4.2: phosphatidylserine is the phospholipid your lipid trans ties to apoptosis.</p>
`});

add('1.1.1',{id:'111-organelles',tier:'must',lo:[3],title:'Organelles and what each one does',html:`
${FIG('1.1.1_p04_19','Fig 17. Organelles')}
${TB(['Organelle','Job and chemistry to know'],[
 ['<b>Nucleus</b>','Holds the genome. DNA <b>replication</b> happens here. Nucleolus = condensed region. Nuclear envelope has <b>nuclear pores</b>.'],
 ['<b>Rough ER</b>','Has ribosomes. Makes and folds proteins. Continuous with the nuclear envelope.'],
 ['<b>Smooth ER</b>','Steroid hormone synthesis, lipoproteins, cytochrome P450, transport vesicles. <b>Stores Ca²⁺</b> for cell signalling.'],
 ['<b>Golgi complex</b>','Stack of membranes. <b>Sorts and packages proteins.</b> Adds sugars (<b>glycosylation</b>).'],
 ['<b>Peroxisome</b>','Oxidation using O₂. Makes or uses <b>H₂O₂</b> (hydrogen peroxide). H₂O₂ is very reactive, so it is kept inside this one organelle.'],
 ['<b>Lysosome</b>','Membrane-bound sac of <b>digestive enzymes</b> that break bonds. The “garbage portion” of the cell. Recycles compounds.'],
 ['<b>Cytosol</b>','Where many metabolic processes happen (54% of a liver cell’s volume).']
])}
${XTRA('Liver cell volume table (optional)',FIG('1.1.1_p04_20','Table 3. Relative volumes in a hepatocyte')+'<p class="small">Cytosol 54, mitochondria 22, rough ER 9, nucleus 6, smooth ER 5, Golgi 1, peroxisomes 1 (percent of cell volume). The number of mitochondria differs by cell type.</p>')}
`});

add('1.1.1',{id:'111-mito',tier:'must',tm:true,lo:[3],title:'Mitochondria',html:`
${FIG('1.1.1_p05_23','Fig 20. Parts of a mitochondrion')}
${UL([
 '“Powerhouse.” Makes about <b>90% of the cell’s ATP</b>.',
 'Two membranes: outer and inner. The space between them is the <b>intermembrane space</b>.',
 '<b>Matrix</b> = where most oxidation happens. <b>Cristae</b> (folds of the inner membrane) increase surface area for energy production.',
 '❗ Has its <b>own DNA</b>, inherited from the <b>mother</b>. Memory tag: <b>M</b>itochondrial = <b>M</b>other.'
])}
<p><b>Processes linked to mitochondria:</b> apoptosis, making reactive oxygen species (ROS), the electron transport chain and oxidative phosphorylation, oxidation of macromolecules, urea cycle, heme synthesis, gluconeogenesis.</p>
`});

add('1.1.1',{id:'111-lookalike',tier:'must',lo:[3],title:'Look-alike organelles: match the clue to the organelle',html:`
${LEAD('Exam stems describe a finding. You name the organelle. Learn the clue, not just the name.')}
${TB(['Clue in the stem','Organelle','Why it is not the tempting one'],[
 ['Hydrogen peroxide (H₂O₂), oxidases, catalase','<b>Peroxisome</b>','Mitochondria also make reactive oxygen species, but as a by-product. It is not their main purpose.'],
 ['Acid hydrolases that digest worn-out material','<b>Lysosome</b>','Lysosomes hold hydrolytic enzymes. They do not hold ribosomes or DNA (trans formative quiz).'],
 ['Cytochrome P450, steroid hormone synthesis','<b>Smooth ER</b>','Rough ER has ribosomes and makes proteins.'],
 ['Sorting, packaging, glycosylation of proteins','<b>Golgi</b>','ER makes and folds. Golgi finishes and sends.'],
 ['Own DNA, maternal inheritance, 90% of ATP','<b>Mitochondrion</b>','Nucleus holds the main genome and does DNA replication.']
])}
${DEC('While studying the chemicals in a cell you detect a small level of hydrogen peroxide. Which structure most likely held it? (mitochondria, peroxisome, lysosome, nucleus) [trans formative quiz]',null,{asks:'Which organelle is <b>built</b> to make or use H₂O₂?',clues:'“Hydrogen peroxide.” One chemical name points to one organelle.',reason:'Peroxisomes run oxidase reactions with O₂ and produce H₂O₂. Catalase then breaks it down.',trap:'Mitochondria. They leak ROS from the electron transport chain, but that is a by-product, not the organelle’s main chemistry.'})}
`});

add('1.1.1',{id:'111-cytoskel',tier:'core',lo:[3],title:'Cytoskeleton',html:`
${LEAD('The cytoskeleton gives the cell its shape and lets it move.')}
${TB(['Part','Made of'],[
 ['Microtubules','Tubulin'],['Intermediate filaments','Intermediate filament proteins'],['Microfilaments','Actin']
])}
<p>Proteins for cell movement (from your trans): <b>myosin, dynein, kinesin</b>.</p>
${NOTE('Note on your trans.','Your amino acid trans (1.3) also names myosin and actin as the motor pair that drives muscle contraction. Your trans gives no other pairings, so learn only what it states.')}
`});

add('1.1.1',{id:'111-hug',tier:'must',tm:true,lo:[4],title:'Where do pathways happen? Cytoplasm, mitochondria, or both (HUG)',html:`
${MEMO('HUG',[['H','Heme synthesis'],['U','Urea cycle'],['G','Gluconeogenesis']],'These three are the processes that take place in <b>both the mitochondria and the cytoplasm</b>.',false)}
${TB(['Cytoplasm only','Mitochondria only','Both (HUG)'],[
 ['Glycolysis<br>HMP (pentose phosphate pathway)<br>Cholesterol synthesis<br>Protein synthesis<br>Fatty acid synthesis<br>Nucleotide synthesis','Acetyl CoA production<br>TCA cycle<br>Electron transport chain<br>Oxidative phosphorylation<br>Beta oxidation<br>Ketogenesis','<b>H</b>eme synthesis<br><b>U</b>rea cycle<br><b>G</b>luconeogenesis']
])}
<p class="small">Do not assume every process is in the cytoplasm. Most energy-producing reactions are in the mitochondria. Trans formative quiz: the first two urea cycle steps (CPS1 and OTC) are in the mitochondrial matrix. The remaining steps are in the cytosol.</p>
`});

add('1.1.1',{id:'111-catab',tier:'core',lo:[4],title:'Catabolism vs anabolism',html:`
${FIG('1.1.1_p06_31','Fig 28. Metabolic pathways')}
${GRID([
 {h:'Catabolism (“cut-abolic”)',c:'r',html:UL(['Breaks complex compounds into simpler ones','<b>Releases energy</b>','That energy feeds anabolism','More energy needed = more catabolism'])},
 {h:'Anabolism',c:'g',html:UL(['Builds molecules the cell needs','Is energetically <b>unfavourable</b> on its own','Needs energy from catabolism'])}
])}
<p class="small">Pathways make energy and also make building blocks. Both are used and regulated by the cell.</p>
`});

add('1.1.1',{id:'111-dogma',tier:'core',lo:[4],title:'Central dogma of molecular biology',html:`
${FIG('1.1.1_p07_34','Fig 30. Central dogma')}
${STEPS(['DNA','<b>Replication</b> → DNA','<b>Transcription</b> → RNA','<b>Translation</b> → protein'])}
${UL([
 'It explains how genetic information becomes protein. Proteins then drive cell processes and regulation.',
 'Replication copies DNA. Transcription makes RNA from DNA. Translation makes protein from RNA (on the ribosome).',
 'Mitochondria run their own copy of this system, more like bacteria than like the nucleus.'
])}
`});

add('1.1.1',{id:'111-cycle',tier:'must',lo:[4],title:'Cell cycle and the four stages of mitosis (PMAT)',html:`
${FIGS([FIG('1.1.1_p07_35','Fig 31. Phases of cell division'),FIG('1.1.1_p07_36','Fig 32. Stages of mitosis')])}
${TB(['Phase','What happens'],[
 ['<b>G1</b>','Cell grows and builds contents to prepare for S phase'],
 ['<b>S</b>','<b>DNA replication</b> (synthesis)'],
 ['<b>G2</b>','Checks the copied DNA and prepares for division'],
 ['<b>G0</b>','No further division. Cell-cycle arrest']
])}
<p><b>Interphase</b> = G1, S, and G2. <b>Mitosis</b> = nuclear division. <b>Cytokinesis</b> = division of the cytosol.</p>
${MEMO('PMAT',[['P','Prophase: chromosomes condense; nuclear envelope breaks down'],['M','Metaphase: chromosomes line up in the middle (equatorial plate)'],['A','Anaphase: sister chromatids are pulled apart to opposite poles'],['T','Telophase: chromosomes begin to decondense; nuclei re-form']],'',false)}
${NOTE('Note on your trans.','The trans lists “spindle fibers attach” under anaphase. Spindle fibres attach to the chromosomes <b>before</b> metaphase. What defines anaphase is that sister chromatids separate. Use that for the exam.')}
`});

add('1.1.1',{id:'111-meiosis',tier:'must',lo:[4],title:'Mitosis vs meiosis',html:`
${TB(['','Mitosis','Meiosis'],[
 ['Purpose','Growth and repair','Sexual reproduction (making gametes)'],
 ['Divisions','One','<b>Two</b> (meiosis 1 and meiosis 2)'],
 ['Products','<b>2</b> cells','<b>4</b> cells'],
 ['Ploidy','<b>Diploid (2n)</b>: 23 pairs = 46 chromosomes','<b>Haploid (n)</b>: 23 chromosomes (not 23 pairs)'],
 ['Are daughters identical?','<b>Genetically identical</b>','<b>Genetically unique</b>'],
 ['Special event','None','Meiosis 1: homologous pairs <b>exchange material</b> before they separate'],
 ['Meiosis 2','—','Looks more like mitosis']
])}
${XTRA('Diagram (optional)',FIG('1.1.1_p07_37','Fig 33. Mitosis vs meiosis'))}
`});

add('1.1.1',{id:'111-vocab1',tier:'core',lo:[],title:'Genetics vocabulary I: gene, chromosome, genome, cell types',html:`
${FIGS([FIG('1.1.1_p08_38','Fig 34. Levels of genetics'),FIG('1.1.1_p08_39','Fig 35. Karyotype (46 chromosomes)')])}
${TB(['Term','Meaning'],[
 ['<b>Gene</b>','A set of biochemical instructions in DNA. It determines a trait. It is a <i>segment</i>.'],
 ['<b>Chromosome</b>','One single organized unit of DNA. It is the <i>entire</i> organized unit.'],
 ['<b>Genome</b>','The complete set of genetic instructions of an organism.'],
 ['<b>Somatic cell</b>','Non-sex cell. <b>23 pairs = 46 chromosomes</b> (diploid).'],
 ['<b>Germ (sex) cell</b>','Gamete-forming cell. <b>23 chromosomes</b> (haploid), <i>not</i> 23 pairs.'],
 ['<b>Autosomal</b>','Non-sex chromosomes (1 to 22).'],
 ['<b>Sex-linked</b>','The X or Y chromosome.']
])}
${ERR('Note on your trans.','Trans 1.2 says a karyotype has “23 chromosomes (non-replication)” and “46 during replication.” This slide is the correct count: a human body cell has 46 chromosomes (23 pairs) even before replication. Replication doubles the DNA copies (92 chromatids), not the chromosome number. The karyotype picture above shows 46.')}
`});

add('1.1.1',{id:'111-vocab2',tier:'must',tm:true,lo:[],title:'Genetics vocabulary II: allele, genotype, phenotype',html:`
${FIGS([FIG('1.1.1_p08_40','Fig 36. Gene loci and traits'),FIG('1.1.1_p09_41','Fig 37. Homozygous and heterozygous')])}
${TB(['Term','Meaning','Quick handle'],[
 ['<b>Allele</b>','A variant of a gene','Version'],
 ['<b>Gene locus</b>','The specific location of a gene on a chromosome','Address'],
 ['<b>Genotype</b>','The alleles present in the DNA','❗ The combination we inherited'],
 ['<b>Phenotype</b>','The alleles that are <i>expressed</i> as a visible trait','❗ What we observe'],
 ['<b>Dominant allele</b>','One copy changes the phenotype. <b>Capital letter</b> (A).',''],
 ['<b>Recessive allele</b>','Needs a copy on <b>both</b> chromosomes to show. <b>Small letter</b> (a).',''],
 ['<b>Homozygous</b>','Two <i>identical</i> alleles: AA or aa',''],
 ['<b>Heterozygous</b>','Two <i>different</i> alleles: Aa',''],
 ['<b>Wild type / mutant</b>','Most common expression in a population / altered expression from a gene mutation','']
])}
${DEC('Two people carry different forms of the gene for eye colour. What do they share? (allele, phenotype, gene locus, genotype) [trans formative quiz]',null,{asks:'What stays the same when the gene <b>forms</b> differ?',clues:'“Different forms of the gene” = different alleles.',reason:'Different alleles sit at the same chromosome address (locus). So the locus is shared. The alleles and genotype differ. The phenotype may or may not differ.',trap:'Phenotype. Different alleles can still give the same eye colour, so it is not guaranteed.'})}
`});

add('1.1.1',{id:'111-modes',tier:'must',tm:true,lo:[],title:'Six modes of inheritance at a glance',html:`
${TB(['Mode','Pedigree pattern','Key rules','Trans examples'],[
 ['<b>Autosomal dominant</b>','<b>Vertical</b>: every generation','Affected person has an affected parent. Each child has <b>1 in 2</b> risk. Males = females. <i>De novo</i> mutations possible.','Huntington disease, freckles'],
 ['<b>Autosomal recessive</b>','<b>Horizontal</b>: siblings; <b>skips generations</b>','Parents usually unaffected carriers. Each child has <b>1 in 4</b> risk. Males = females. Consanguinity raises chance.','Sickle cell anaemia, cystic fibrosis'],
 ['<b>X-linked dominant</b>','Like AD, but <b>all daughters, no sons</b> of an affected father are affected','Milder and more variable in females. Higher lethality in males. Mothers pass to sons and daughters.','Fragile X syndrome'],
 ['<b>X-linked recessive</b>','<b>Knight’s move</b> (L shape)','<b>❗ NEVER father to son.</b> Mainly males. Affected males linked through <i>females</i> (maternal uncles). Brothers of an affected boy: 1 in 2 risk. Sisters: 1 in 2 carriers. <i>De novo</i> frequent.','Colour blindness, Duchenne muscular dystrophy'],
 ['<b>Y-linked</b>','Vertical, only males','<b>All sons</b> of an affected father are affected. Never females.','Hairy pinna'],
 ['<b>Mitochondrial</b>','Mother → <b>all</b> children','Only the mother passes it (M for Mother). Fathers never do.','Leigh syndrome']
])}
${XTRA('Disorder and inheritance table from your trans (optional)',FIG('1.1.1_p15_58','Appendix B. Some genetic disorders and inheritance patterns'))}
`});

add('1.1.1',{id:'111-pedigree',tier:'must',lo:[],title:'Reading a pedigree in three questions',html:`
${FIGS([FIG('1.1.1_p09_43','Fig 40. Pedigree symbols'),FIG('1.1.1_p10_47','Fig 44. X-linked recessive pedigree')])}
${LEAD('Ask the same three questions every time. They sort five of the six modes.')}
${OL([
 '<b>Does it skip generations?</b> Yes → recessive. No, it appears in every generation → dominant.',
 '<b>Are males and females equally affected?</b> Yes → autosomal. Mostly males → X-linked recessive. Only males → Y-linked.',
 '<b>Can an affected father pass it to his son?</b> Yes → not X-linked recessive. All sons affected → Y-linked. Only daughters affected → X-linked dominant.'
])}
<p class="small">Trans tip: mark generations with Roman numerals (I, II, III). Example from your trans: II5 and II6 are carriers because their son III5 is affected, so the trait is recessive.</p>
${FIGS([FIG('1.1.1_p09_44','Autosomal dominant'),FIG('1.1.1_p10_45','Autosomal recessive'),FIG('1.1.1_p10_46','X-linked dominant'),FIG('1.1.1_p10_48','Y-linked'),FIG('1.1.1_p11_49','Mitochondrial')])}
`});

add('1.1.1',{id:'111-punnett',tier:'must',lo:[],title:'Predicting inheritance: Punnett squares and the product rule',html:`
${FIGS([FIG('1.1.1_p11_51','Fig 49. Punnett square of two heterozygous parents'),FIG('1.1.1_p11_52','Fig 50. Product rule')])}
${UL([
 '<b>Law of segregation:</b> homologous chromosomes separate in meiosis, then recombine at fertilisation. This gives variety in offspring.',
 '<b>Aa × Aa</b> gives 1 AA : 2 Aa : 1 aa. So <b>25%</b> AA, <b>50%</b> Aa, <b>25%</b> aa.',
 'Two traits at once: <b>multiply</b> the chances. Example: two aa recessive traits each 1/4 → 1/4 × 1/4 = <b>1/16</b>.'
])}
${ERR('Typo in your trans.','The trans writes “¼ + ¼ = 1/16.” It must be ¼ <b>×</b> ¼ = 1/16. You multiply independent chances. Adding gives ½.')}
${TB(['Trans worked example','Answer'],[
 ['Both parents Ss (sickle cell is recessive). Chance the child is heterozygous?','2 of 4 squares = <b>50%</b>'],
 ['Teen has blood type O. Both parents are type A. Possible?','<b>Yes</b>, but only if both parents are heterozygous (AO × AO gives 1/4 OO).'],
 ['Both parents show an autosomal recessive trait. Chance a child is homozygous dominant?','<b>0%.</b> Both are aa, so every child is aa.']
])}
${DEC('A homozygous dominant mother and a heterozygous father ask about the chance that their child has Tay-Sachs disease, an autosomal recessive disease. What is the accurate answer? (options in your photo were 50%/50%, none but 50% carrier, 25%/25%, none but 100% carrier)',null,{asks:'Chance of the disease <b>and</b> chance of being a carrier for AA × Aa.',clues:'“Homozygous dominant” = AA. “Heterozygous” = Aa. “Autosomal recessive” = needs aa.',reason:'Mother gives only A. Father gives A or a. Children are AA or Aa, half each. No child can be aa. So the disease chance is 0%, and 50% are carriers.',trap:'25%/25%. That is the Aa × Aa square, but the mother here is AA, not Aa.'})}
`});

add('1.1.1',{id:'111-rc1',type:'recall',tier:'must',title:'Recall check 1: cells, domains, organelles',lo:[1,2,3,4],items:[
 {k:'mcq',f:1,lo:2,q:'A researcher isolates a single-celled organism. It has a circular chromosome, no nuclear envelope, and a peptidoglycan cell wall. It is most likely which type of organism?',o:['Archaeon','Bacterium','Eukaryote','Virus'],a:1,why:'Peptidoglycan in the cell wall and a circular chromosome with no nucleus point to <b>Bacteria</b>.',w:{0:'Archaea also lack a nucleus and have circular DNA, but they have <b>no peptidoglycan</b>. That one feature separates them.',2:'Eukaryotes have a nuclear envelope and linear chromosomes.',3:'A virus is not a cell. It has no cell wall.'}},
 {k:'mcq',f:1,lo:3,q:'A child has a disease in which worn-out cell parts pile up because acid-dependent digestive enzymes are missing. Which organelle is most directly defective?',o:['Peroxisome','Golgi complex','Lysosome','Smooth ER'],a:2,why:'The lysosome holds the digestive (acid hydrolase) enzymes that break down worn material. Your trans calls it the “garbage portion of the cell.”',w:{0:'The peroxisome does oxidation with O₂ and handles H₂O₂.',1:'The Golgi sorts, packages and adds sugars to proteins.',3:'Smooth ER makes steroids and lipoproteins and holds P450.'}},
 {k:'mcq',f:1,lo:4,q:'A liver disease is caused by a defect in a pathway that runs in both the mitochondria and the cytoplasm. Which pathway fits?',o:['Glycolysis','Beta oxidation','Fatty acid synthesis','Urea cycle'],a:3,why:'HUG: <b>H</b>eme synthesis, <b>U</b>rea cycle, <b>G</b>luconeogenesis run in both places. The first urea cycle steps are in the mitochondrial matrix, the rest in the cytosol.',w:{0:'Glycolysis is cytoplasm only.',1:'Beta oxidation is mitochondria only.',2:'Fatty acid synthesis is cytoplasm only.'}},
 {k:'mcq',lo:3,q:'A patient has a disease that passes only from mothers to all of their children. Which observation best explains this pattern?',o:['The gene is on the X chromosome','The gene is a dominant autosomal allele','The gene sits in mitochondrial DNA','The gene sits on the Y chromosome'],a:2,why:'Mitochondria carry their own DNA and are inherited only from the mother. Mother → <b>all</b> children is the mitochondrial pattern (Leigh syndrome).',w:{0:'X-linked dominant would pass from an affected father to all daughters, and X-linked recessive shows a knight’s move.',1:'AD would also pass from fathers.',3:'Y-linked passes only father to sons.'}},
 {k:'mcq',lo:3,q:'Which statement best describes the role of cholesterol in the plasma membrane?',o:['It buffers membrane fluidity in cold and heat','It forms the hydrophilic head of the bilayer','It anchors proteins as a single helix','It moves signals from the inner to the outer leaflet'],a:0,why:'Cholesterol’s bulky four-ring structure buffers fluidity in both cold and heat.',w:{1:'The heads are phospholipid phosphate groups.',2:'That describes a membrane protein.',3:'Cholesterol is not a signal carrier.'}},
 {k:'flash',lo:1,q:'List the four macromolecule classes a cell can make.',a:'Carbohydrates, proteins, lipids, nucleic acids.'},
 {k:'flash',lo:3,q:'Which organelle makes about 90% of the cell’s ATP, and why is its DNA from the mother only?',a:'The mitochondrion. It has its own DNA (endosymbiotic origin) that comes with the egg cytoplasm, so it is maternal.'}
]});

add('1.1.1',{id:'111-rc2',type:'recall',tier:'must',title:'Recall check 2: cell division and genetics',lo:[4],items:[
 {k:'mcq',f:1,lo:4,q:'A drug blocks DNA replication. Cells treated with it would be unable to complete which phase?',o:['G1','S','Metaphase','Cytokinesis'],a:1,why:'DNA replication (synthesis) happens in <b>S phase</b>. G1 only builds cell contents to prepare for S.',w:{0:'G1 is growth and preparation.',2:'Metaphase is chromosomes lining up. Replication is already done by then.',3:'Cytokinesis is division of the cytosol.'}},
 {k:'mcq',lo:4,q:'Which event happens only in meiosis I and not in mitosis?',o:['Sister chromatids separate','Chromosomes align at the equatorial plate','The nuclear envelope breaks down','Homologous chromosomes exchange material'],a:3,why:'Meiosis I is the phase where homologous pairs exchange material. This is one reason the four haploid cells are genetically unique.',w:{0:'Sister chromatid separation is anaphase of mitosis and of meiosis II.',1:'Alignment in the middle is metaphase in both.',2:'Envelope breakdown occurs in both.'}},
 {k:'mcq',f:1,q:'A girl is affected by an X-linked recessive disease. Which statement must be true?',o:['Her father is affected','Her mother is unaffected and not a carrier','Her father is an unaffected carrier','Her brothers are all unaffected'],a:0,why:'A girl needs the allele on <b>both</b> X chromosomes. Her father gives his one X, so he must be affected. Her mother gives an X too, so she is a carrier or affected.',w:{1:'The mother must carry the allele.',2:'A male has one X, so with the allele he is affected. He cannot be an unaffected carrier.',3:'Her brothers have a 1 in 2 chance of being affected.'}},
 {k:'mcq',f:1,q:'A pedigree shows an affected father whose <b>daughters are all affected</b> and whose <b>sons are all unaffected</b>. An affected mother has affected sons and daughters. Which mode fits?',o:['Autosomal dominant','X-linked recessive','X-linked dominant','Y-linked'],a:2,why:'All daughters and no sons of an affected father are affected: that is the <b>X-linked dominant</b> rule.',w:{0:'AD would also affect some sons of an affected father.',1:'XLR never passes father to son and rarely affects daughters in every case.',3:'Y-linked would affect all sons and no daughters.'}},
 {k:'mcq',lo:4,q:'Two people who are both carriers of an autosomal recessive disease (Aa × Aa) have a child. What is the chance that the child is a carrier (Aa)?',o:['25%','50%','33%','75%'],a:1,why:'Aa × Aa gives 1 AA : 2 Aa : 1 aa. Two of four squares are Aa = 50%.',w:{0:'25% is the chance of aa (affected).',3:'75% is the chance of not being aa (unaffected).'}},
 {k:'mcq',q:'Two parents both express an autosomal recessive trait (aa × aa). What is the chance that their child is homozygous dominant?',o:['100%','50%','25%','0%'],a:3,why:'Neither parent has an A allele, so every child is aa. AA is impossible.',w:{2:'25% would apply to Aa × Aa.'}},
 {k:'flash',q:'Which mode of inheritance “never” passes from father to son, and why?',a:'X-linked recessive. A father gives his son only his Y chromosome. Sons get their X from their mother.'}
]});
