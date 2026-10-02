import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
import os
import win32com.client
import pypdf

def build_top_tier_resume():
    doc = docx.Document()
    
    # Precise margins for strictly 1-page fit
    for section in doc.sections:
        section.top_margin = Inches(0.28)
        section.bottom_margin = Inches(0.28)
        section.left_margin = Inches(0.36)
        section.right_margin = Inches(0.36)
        
    def add_p(space_before=0, space_after=1.2, line_spacing=1.02):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_heading(title):
        p = add_p(space_before=4, space_after=1.5)
        run = p.add_run(title)
        run.font.name = 'Calibri'
        run.font.size = Pt(9.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(18, 18, 20)
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="6" w:space="1" w:color="D5D5CE"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    def add_hyperlink(paragraph, url, text, color_hex="1D4ED8", underline=True, font_size_pt=8.5, bold=False):
        part = paragraph.part
        r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
        u_tag = '<w:u w:val="single"/>' if underline else ''
        b_tag = '<w:b/>' if bold else ''
        sz_val = int(font_size_pt * 2)
        xml_str = f'''<w:hyperlink xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}">
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:sz w:val="{sz_val}"/>
                    <w:color w:val="{color_hex}"/>
                    {u_tag}
                    {b_tag}
                </w:rPr>
                <w:t xml:space="preserve">{text}</w:t>
            </w:r>
        </w:hyperlink>'''
        paragraph._p.append(parse_xml(xml_str))

    # 1. HEADER
    p_name = add_p(space_before=0, space_after=0.5)
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_name = p_name.add_run('SOHAN GADEWAR')
    r_name.font.name = 'Calibri'
    r_name.font.size = Pt(15.5)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(18, 18, 20)

    p_sub = add_p(space_before=0, space_after=1)
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run('Associate Product Manager Candidate  |  B.Tech IT, VIIT Pune (CGPA: 8.97 / 10.0)')
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(9)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(30, 30, 35)

    p_contact = add_p(space_before=0, space_after=2)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_contact.add_run('+91 9022778561  •  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'mailto:sohangadewar9022@gmail.com', 'sohangadewar9022@gmail.com', underline=False)
    r = p_contact.add_run('  •  Portfolio: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'https://portfolio-sohan9022.vercel.app', 'portfolio-sohan9022.vercel.app', underline=True)
    r = p_contact.add_run('  •  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'https://linkedin.com', 'LinkedIn', underline=True)
    r = p_contact.add_run('  •  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'https://github.com/Sohan9022', 'GitHub', underline=True)
    r = p_contact.add_run('  •  Pune, India')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(80, 80, 85)

    # 2. EDUCATION
    add_heading('EDUCATION')
    p_edu1 = add_p(space_before=1, space_after=0.5)
    r = p_edu1.add_run('Vishwakarma Institute of Information Technology (VIIT), Pune')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    r = p_edu1.add_run('  |  Bachelor of Technology in Information Technology')
    r.font.name = 'Calibri'; r.font.size = Pt(9)
    r = p_edu1.add_run('  |  2023 – 2027  |  CGPA: 8.97 / 10.0')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p_edu2 = add_p(space_before=0, space_after=2)
    r = p_edu2.add_run('Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, System Design  •  Problem Solving: 400+ LeetCode, 210+ GeeksforGeeks')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(60, 60, 65)

    # 3. SELECTED PRODUCT SYSTEMS & LIVE PROTOTYPES (ONLY LIVE WORK FROM PORTFOLIO)
    add_heading('SELECTED PRODUCT SYSTEMS & VALIDATED PROTOTYPES')

    # Project 1: Project Sentinel
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('Project Sentinel — AI Decision Memory & State-Drift Agent  |  Enterprise AI  |  Live MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://echo-sentinel-08.lovable.app', 'echo-sentinel-08.lovable.app', font_size_pt=9, bold=True)
    r = p.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link', 'Notion PRD', font_size_pt=9, bold=True)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Discovery & Problem Framing: Identified critical engineering context loss across daily standups and Slack threads; observed that existing summary bots suffer 80%+ uninstall rates due to unsolicited channel interruptions that break deep work.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Product Strategy & Scoping: Established the "Silent-by-Default" thesis—ingests audio transcripts and Git/Jira streams passively, surfacing drift only when queried; defined explicit V1 non-goals (no automated ticket spam, zero velocity surveillance).')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Execution & Validation: Shipped interactive 8-step clickable MVP on Lovable with append-only PostgreSQL event schema mapping detected drift to immutable transcript IDs; authored 400-line Notion PRD with state machines and query syntax.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 2: FinMate AI
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('FinMate AI — Conversational Expense Memory & Deterministic Accounting  |  FinTech Systems  |  Live MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://tell-finmate-ai.lovable.app', 'tell-finmate-ai.lovable.app', font_size_pt=9, bold=True)
    r = p.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link', 'Notion PRD', font_size_pt=9, bold=True)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• User Friction & Insight: Addressed high user abandonment in personal finance caused by 6-field manual logging forms, while identifying that pure conversational LLMs hallucinate calculations, making them untrustworthy for financial balances.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• System Guardrails & Architecture: Decoupled unstructured capture from arithmetic—restricted multimodal models (voice notes, receipt OCR, natural chat) strictly to intent parsing, delegating 100% of calculations to concurrency-safe PostgreSQL stored procedures.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Validation & Prototype: Shipped live Lovable MVP featuring voice transcription, debt reconciliation, and 100% citation-backed balance summaries tied to underlying ledger rows with zero math hallucinations; authored complete Notion PRD.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 3: Spaces
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('Spaces — Contextual Personalization Framework & Telemetry Firewall  |  AI Personalization  |  Live MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://space-context-switch.lovable.app', 'space-context-switch.lovable.app', font_size_pt=9, bold=True)
    r = p.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://app.notion.com/p/SPACES-3ce53f22e2b0805db12ef30ed696c7b5?source=copy_link', 'Notion PRD', font_size_pt=9, bold=True)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Problem & Context Collapse: Tackled algorithmic context collapse in feed recommendation systems where casual weekend browsing pollutes professional machine learning feeds, forcing users into multi-account friction.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Architecture & Outcome: Designed a "Context Firewall" middleware isolating behavioral telemetry and vector embedding stores per active space while keeping authentication, identity, and billing consolidated under 1 account; shipped live Lovable MVP with 4 isolated spaces; authored Notion PRD.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 4: SHRH
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('SHRH — Semantic Human-Readable Hashing  |  AI Governance & Developer Tools  |  Google APM PRD Specification')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Problem & Metric Design: Addressed developer alert fatigue where standard SHA-256 hashes treat harmless formatting typo edits identically to critical security regressions (\'MUST enforce MFA\' → \'MAY enforce MFA\').')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Triage Engine & Benchmark: Architected dual-channel gate separating topical semantic drift from deontic constraint shifts; saved $15k/mo in cloud LLM costs via local execution; benchmarked on 2,744 revisions (slashed defect escapes by 92.6% with 0.0% false alarms on benign edits); authored Google APM PRD spec (Maya Lin ICP, Autonomous Safe Triage Rate metric).')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 5: GiftVerse Moments
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('GiftVerse Moments — Digital Gifting Reveal Experiences  |  Consumer AI  |  Live MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://gift-verse-moments.lovable.app', 'gift-verse-moments.lovable.app', font_size_pt=9, bold=True)
    r = p.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    add_hyperlink(p, 'https://app.notion.com/p/GIFTVVERSE-3d053f22e2b0804b8b90cf6da95b931f?source=copy_link', 'Notion PRD', font_size_pt=9, bold=True)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Product Discovery & MVP: Identified that digital gift cards feel sterile and transactional; designed an AI Experience Director choreographing 30–60s micro-suspense reveal journeys with encrypted payload isolation; shipped live Lovable MVP; authored Notion PRD.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 4. PATENTS & HUMAN-CENTERED RESEARCH
    add_heading('PATENTS & USER RESEARCH')
    p = add_p(space_before=1, space_after=0.5)
    r = p.add_run('• Patent Application Draft (VIT Pune UX Lab): AI-Driven Multilingual Adaptive UI Framework & Zero-Risk Financial Sandbox — Designed dual-mode environment pairing live transactions with a simulated practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture affordances to eliminate digital financial hesitation in emerging vernacular markets | 2026')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=2)
    r = p.add_run('• Patent Filed (South African Patent Office): AI-Powered Lost & Found Matching System — Conceptualized a 5-factor blind multimodal scoring architecture (image embeddings, NLP text, geolocation, timestamp) with automated urgency detection | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 5. HONORS & ACHIEVEMENTS
    add_heading('HONORS & COMPETITIONS')
    p = add_p(space_before=1, space_after=0.5)
    r = p.add_run('• India Innovates Hackathon — National Finalist: Selected in top ~1,000 teams nationwide out of 6,000+ participating teams (Top ~16%)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=2)
    r = p.add_run('• GHCI 25 Hackathon — Round 2 Qualifier: AnitaB.org India & Backbase | National GenAI Hackathon: \'Unbound with GenAI: Breaking Barriers, Creating Impact\'')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 6. PRODUCT & TECHNICAL SKILLS
    add_heading('PRODUCT MANAGEMENT & TECHNICAL SKILLS')
    p = add_p(space_before=1, space_after=0.5)
    r = p.add_run('• Product Management: Product Discovery, PRD Writing, Jobs-to-be-Done (JTBD), User Journey Mapping, RICE Prioritization, North Star & Counter-Metrics, Customer Interviews, Experimentation, GTM Strategy, Trade-off Analysis')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• AI & Systems: LLM Prompt Engineering, RAG Architectures, Multimodal Ingestion, Deterministic SQL, AI Governance, Lovable.dev (Rapid MVPs), Supabase (RLS), Vector Embeddings')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=2)
    r = p.add_run('• Engineering & Problem Solving: Java, Spring Framework, Python, SQL/PostgreSQL, REST APIs, Git, System Architecture  •  Competitive Programming: 400+ LeetCode, 210+ GeeksforGeeks')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 7. CERTIFICATIONS
    add_heading('CERTIFICATIONS')
    p = add_p(space_before=1, space_after=0)
    r = p.add_run('Product Management Masterclass (GeeksforGeeks)  •  AI Agents & Automation (CampusX)  •  Advanced RAG Architecture (CampusX)  •  Prompt Engineering & Docker for ML (CampusX)  •  Postman API Student Expert')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Target destinations
    dest_docx_1 = os.path.abspath('e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.docx')
    dest_docx_2 = os.path.abspath('e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.docx')
    dest_docx_3 = os.path.abspath('e:/pm_portfoli_new/dist/Sohan_Gadewar_Resume.docx')

    dest_pdf_1 = os.path.abspath('e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.pdf')
    dest_pdf_2 = os.path.abspath('e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.pdf')
    dest_pdf_3 = os.path.abspath('e:/pm_portfoli_new/dist/Sohan_Gadewar_Resume.pdf')

    # Save docx files
    doc.save(dest_docx_1)
    doc.save(dest_docx_2)
    if os.path.exists(os.path.dirname(dest_docx_3)):
        doc.save(dest_docx_3)

    # Convert to PDF via Word COM
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    wdoc = word.Documents.Open(dest_docx_1)
    pages = wdoc.ComputeStatistics(2)
    wdoc.SaveAs2(dest_pdf_1, 17)
    wdoc.SaveAs2(dest_pdf_2, 17)
    if os.path.exists(os.path.dirname(dest_pdf_3)):
        wdoc.SaveAs2(dest_pdf_3, 17)
    wdoc.Close(False)
    word.Quit()

    # Validate with PyPDF
    reader = pypdf.PdfReader(dest_pdf_1)
    pdf_pages = len(reader.pages)

    print(f"Build complete!")
    print(f"Word computed pages: {pages}")
    print(f"PyPDF verified pages: {pdf_pages}")
    print(f"Docx generated: {dest_docx_1} ({os.path.getsize(dest_docx_1)} bytes)")
    print(f"Docx public: {dest_docx_2} ({os.path.getsize(dest_docx_2)} bytes)")
    print(f"PDF generated: {dest_pdf_1} ({os.path.getsize(dest_pdf_1)} bytes)")
    print(f"PDF public: {dest_pdf_2} ({os.path.getsize(dest_pdf_2)} bytes)")

if __name__ == '__main__':
    build_top_tier_resume()
