import lightrdf
import nltk
from urllib.parse import unquote
parser = lightrdf.Parser()  # or lightrdf.xml.Parser() for xml

def search_relations():
    concept = str(input("Enter a concept :"))
    print('superTopic : ')
    for triple in parser.parse("./CSO.3.3.owl", base_iri=None):
        if "superTopic" in triple[1] and concept in triple[0] or concept in triple[1]:
            a, b, c = triple
            print('\t',c)
#search_relations()

# Pentru  textul de aici folosiți unul din instrumentele disponibile pentru marcarea părților de vorbire (POS tagging). Pe fișierul rezultat căutați propoziții în care apar două substantive cu un verb între ele și extrageți într-un fișier, pe câte un rând, toate aceste propozițiii. Între substantive și verb pot fi și alte părți de vorbire.

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('universal_tagset')

def extract_sentences():
    file_descriptor = open("cs.txt","r",encoding="utf8")
    content = file_descriptor.read()
    list_sentences = nltk.tokenize.sent_tokenize(content)
    return_sentences = []

    f = open("output.txt", "a", encoding="utf8")
    for sentence in list_sentences:
        if len(sentence) > 5: # ceva conditie de exclus fraze doar cu spatii
            list = []
            ok = 0
            for tags in nltk.pos_tag(nltk.word_tokenize(sentence), tagset='universal'):
                if tags[1] == 'NOUN':
                    list.append('NOUN')
                if tags[1] == 'VERB':
                    list.append('VERB')
                
                # if list is messed up reset it
                if len(list) == 3 and ( list[0] != 'NOUN' or list[1] != 'VERB' or list[2] != 'NOUN' ):
                    list = []
                elif len(list) == 3:
                    ok = 1
            if(ok == 1):
                f.write(sentence)
    f.close()

#extract_sentences()

# (0.2) Din fișierul extras la punctul anterior extrageți un alt fișier în care includeți numai fragmente în care apare lexicalizarea cel puțin a unui concept din ontologie.
def extract_concepts():
    concepts = []
    for triple in parser.parse("./CSO.3.3.owl", base_iri=None):
        concept = unquote(triple[0].split('/')[4]).replace("_"," ").replace("-"," ")
        try:
            concepts.index(concept)
        except ValueError:
            concepts.append(concept)
    return concepts
#extract_concepts()

def extract_ontologies():
    f = open('./output.txt','r',encoding="utf8")
    sentences = nltk.tokenize.sent_tokenize(f.read())
    
    concepts = extract_concepts()
    for sentence in sentences:
        for c in concepts:
            if c in sentence:
                print(c, ":", sentence)

extract_ontologies()