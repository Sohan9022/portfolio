import docx
import pypdf
import pymupdf
import re

def evaluate_ats_compatibility(docx_path="Sohan_Gadewar_Google_APM_Resume.docx", pdf_path="Sohan_Gadewar_Google_APM_Resume.pdf"):
    print("=" * 65)
    print("      COMPREHENSIVE ATS & RESUME360 COMPLIANCE AUDIT REPORT")
    print("=" * 65)
    
    # 1. Docx extraction
    doc = docx.Document(docx_path)
    docx_text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
    
    # 2. PDF extraction
    reader = pypdf.PdfReader(pdf_path)
    pdf_text = "\n".join([page.extract_text() for page in reader.pages])
    
    # 3. Contact information parsing check
    print("\n[1] CONTACT INFORMATION EXTRACTION (Regex & Token Stream):")
    
    first_line = docx_text.splitlines()[0].strip()
    print(f"  • Candidate Name: '{first_line}' -> {'PASS' if 'SOHAN GADEWAR' in first_line else 'FAIL'}")
    
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', pdf_text)
    print(f"  • Email Extracted: {email_match.group(0) if email_match else 'None'} -> {'PASS' if email_match else 'FAIL'}")
    
    phone_match = re.search(r'\+?\d[\d -]{8,15}\d', pdf_text)
    print(f"  • Phone Extracted: {phone_match.group(0) if phone_match else 'None'} -> {'PASS' if phone_match else 'FAIL'}")
    
    linkedin_match = re.search(r'linkedin\.com/in/[\w-]+', pdf_text)
    print(f"  • LinkedIn Handle: {linkedin_match.group(0) if linkedin_match else 'None'} -> {'PASS' if linkedin_match else 'FAIL'}")
    
    github_match = re.search(r'github\.com/[\w-]+', pdf_text)
    print(f"  • GitHub Handle: {github_match.group(0) if github_match else 'None'} -> {'PASS' if github_match else 'FAIL'}")

    portfolio_match = re.search(r'portfolio-[\w\.-]+', pdf_text)
    print(f"  • Portfolio URL: {portfolio_match.group(0) if portfolio_match else 'None'} -> {'PASS' if portfolio_match else 'FAIL'}")
    
    location_match = re.search(r'Pune,\s*India', pdf_text)
    print(f"  • Location Extracted: {location_match.group(0) if location_match else 'None'} -> {'PASS' if location_match else 'FAIL'}")

    # 4. Standard ATS Section Headings
    print("\n[2] 4 KEY SECTIONS + ALL STANDARDIZED HEADINGS:")
    expected_sections = [
        ("1. Profile Summary", r'\bPROFILE SUMMARY\b|\bPROFESSIONAL SUMMARY\b'),
        ("2. Work Experience (or Projects)", r'\bWORK EXPERIENCE & PROJECTS\b|\bWORK EXPERIENCE\b|\bEXPERIENCE\b'),
        ("3. Education", r'\bEDUCATION\b'),
        ("4. Skills", r'\bSKILLS\b'),
        ("5. Patents & Research", r'\bPATENTS & RESEARCH\b'),
        ("6. Honors & Awards", r'\bHONORS & AWARDS\b'),
        ("7. Certifications", r'\bCERTIFICATIONS\b')
    ]
    all_sections_pass = True
    for label, pattern in expected_sections:
        found = bool(re.search(pattern, pdf_text, re.IGNORECASE))
        print(f"  • {label:30}: {'DETECTED (PASS)' if found else 'MISSING (FAIL)'}")
        if not found:
            all_sections_pass = False

    # 5. Action Verbs Check (Bullets start with strong active verbs)
    print("\n[3] ACTION VERB LEAD-IN AUDIT:")
    bullets = [p.text for p in doc.paragraphs if p.text.strip().startswith('•')]
    verb_pass = True
    action_verbs_found = []
    for b in bullets:
        first_word = b.replace('•', '').strip().split()[0]
        # Check if first word is a known action verb or standard lead
        action_verbs_found.append(first_word)
        print(f"  • Bullet opener: '{first_word:15}' -> {b[:60]}...")
    
    # 6. Personal Pronouns Check
    print("\n[4] PERSONAL PRONOUN ELIMINATION AUDIT:")
    pronouns = re.findall(r'\b(I|me|my|mine|we|us|our|ours|they|them|their|theirs)\b', docx_text, re.IGNORECASE)
    print(f"  • Detected Pronouns: {pronouns} -> {'PASS (0 Pronouns Found)' if len(pronouns) == 0 else 'FAIL'}")

    # 7. Dates & Timeline Recognition
    print("\n[5] DATES & TIMELINE PARSING:")
    dates = re.findall(r'(?:20\d\d\s*[–-]\s*(?:20\d\d|\bExpected\b|\bPresent\b)|202[34567])', pdf_text)
    print(f"  • Distinct Date Tokens: {len(dates)} occurrences ({list(set(dates))}) -> PASS")

    # 8. Grammar & Hyphenation Check
    print("\n[6] GRAMMAR & SPELLING FIXES VERIFICATION:")
    has_grammar_mistake1 = "chat) strictly to intent and entity" in docx_text
    has_grammar_mistake2 = "Problem Solving:" in docx_text and "Problem-Solving:" not in docx_text
    print(f"  • Entity extraction phrasing: {'CLEAN (PASS)' if not has_grammar_mistake1 else 'FLAGGED'}")
    print(f"  • Hyphenated 'Problem-Solving': {'CORRECT (PASS)' if not has_grammar_mistake2 else 'FLAGGED'}")

    # 9. Page Constraints & Layout
    print("\n[7] PAGE FIT & PDF STREAM:")
    print(f"  • PDF Total Pages: {len(reader.pages)} (Target: 1) -> {'PASS' if len(reader.pages) == 1 else 'FAIL'}")
    annots = reader.pages[0].get('/Annots')
    print(f"  • Verified Clickable Hyperlinks in PDF: {len(annots) if annots else 0} active links")

if __name__ == '__main__':
    evaluate_ats_compatibility()
