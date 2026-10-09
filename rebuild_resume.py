import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
import os
import shutil
import win32com.client
import pypdf
import pymupdf

def build_top_tier_resume():
    """
    Builds a 100% ATS-Compliant, strictly 1-page Associate Product Manager (APM) resume.
    """
    doc = docx.Document()
    
    # 0.35 in vertical margins, 0.40 in horizontal margins
    for section in doc.sections:
        section.top_margin = Inches(0.35)
        section.bottom_margin = Inches(0.35)
        section.left_margin = Inches(0.40)
        section.right_margin = Inches(0.40)
        
    def add_p(space_before=0, space_after=1.4, line_spacing=1.05):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_heading(title):
        p = add_p(space_before=4.2, space_after=1.6)
        run = p.add_run(title)
        run.font.name = 'Calibri'
        run.font.size = Pt(9.8)
        run.font.bold = True
        run.font.color.rgb = RGBColor(18, 18, 20)
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="6" w:space="1" w:color="D5D5CE"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    def add_hyperlink(paragraph, url, text, color_hex="1D4ED8", underline=True, font_size_pt=8.9, bold=False):
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

    # ==========================
    # 1. HEADER & CONTACT INFO
    # ==========================
    p_name = add_p(space_before=0, space_after=0.8)
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_name = p_name.add_run('SOHAN GADEWAR')
    r_name.font.name = 'Calibri'; r_name.font.size = Pt(15.5); r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(18, 18, 20)

    p_sub = add_p(space_before=0, space_after=1.2)
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run('Associate Product Manager | Product Builder | B.Tech IT, VIIT Pune (CGPA: 8.97 / 10.0)')
    r_sub.font.name = 'Calibri'; r_sub.font.size = Pt(9.2); r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(30, 30, 35)

    p_contact = add_p(space_before=0, space_after=2.8)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r = p_contact.add_run('Pune, India  |  +91 9022778561  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.color.rgb = RGBColor(70, 70, 75)
    
    add_hyperlink(p_contact, 'mailto:sohangadewar9022@gmail.com', 'sohangadewar9022@gmail.com', underline=False, font_size_pt=8.9)
    
    r = p_contact.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.color.rgb = RGBColor(70, 70, 75)
    
    add_hyperlink(p_contact, 'https://portfolio-sohan9022.vercel.app', 'portfolio-sohan9022.vercel.app', underline=True, font_size_pt=8.9)
    
    r = p_contact.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.color.rgb = RGBColor(70, 70, 75)
    
    add_hyperlink(p_contact, 'https://linkedin.com/in/sohangadewar', 'linkedin.com/in/sohangadewar', underline=True, font_size_pt=8.9)
    
    r = p_contact.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.color.rgb = RGBColor(70, 70, 75)
    
    add_hyperlink(p_contact, 'https://github.com/Sohan9022', 'github.com/Sohan9022', underline=True, font_size_pt=8.9)

    # ==========================
    # 2. PROFILE SUMMARY
    # ==========================
    add_heading('PROFILE SUMMARY')
    p_sum = add_p(space_before=0.5, space_after=2.5)
    r = p_sum.add_run('Associate Product Manager candidate and 0-to-1 product builder combining strong software foundations (CGPA: 8.97/10.0) with rapid execution. Experienced in scoping comprehensive PRDs, conducting user research, and deploying AI-driven systems with deterministic architectures that eliminate cognitive fatigue.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.color.rgb = RGBColor(40, 40, 45)

    # ==========================
    # 3. EDUCATION
    # ==========================
    add_heading('EDUCATION')
    p_edu1 = add_p(space_before=0.5, space_after=0.5)
    r = p_edu1.add_run('Vishwakarma Institute of Information Technology (VIIT), Pune')
    r.font.name = 'Calibri'; r.font.size = Pt(9.3); r.font.bold = True
    r = p_edu1.add_run('  |  Bachelor of Technology in Information Technology')
    r.font.name = 'Calibri'; r.font.size = Pt(9.1)
    r = p_edu1.add_run('  |  2023 – 2027 (Expected)  |  CGPA: 8.97 / 10.0')
    r.font.name = 'Calibri'; r.font.size = Pt(9.1); r.font.bold = True

    p_edu2 = add_p(space_before=0, space_after=2.4)
    r = p_edu2.add_run('Relevant Coursework: Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems, Computer Networks, System Design, Object-Oriented Programming (OOP)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.color.rgb = RGBColor(60, 60, 65)

    # ============================================
    # 4. WORK EXPERIENCE & PROJECTS (Exact ATS)
    # ============================================
    add_heading('WORK EXPERIENCE & PROJECTS')

    # Flagship 1: Project Sentinel
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('Project Sentinel — AI Decision Memory & State-Drift Agent  |  Enterprise AI Product  |  2024 – 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(9.2); r.font.bold = True
    p_link1 = add_p(space_before=0, space_after=0.7)
    r = p_link1.add_run('Interactive Prototype: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.bold = True
    add_hyperlink(p_link1, 'https://echo-sentinel-08.lovable.app', 'echo-sentinel-08.lovable.app', font_size_pt=8.8, bold=True)
    r = p_link1.add_run('  |  PRD Specification: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.bold = True
    add_hyperlink(p_link1, 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link', 'Notion PRD', font_size_pt=8.8, bold=True)

    # Bullets starting with strong action verbs & quantified impact
    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Spearheaded product discovery across standups, Slack, and Jira, identifying critical context loss and finding that unprompted bot summaries cause an 80%+ uninstall rate by interrupting deep developer focus.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Formulated the "Silent-by-Default" product thesis, passively ingesting audio transcripts and commit streams without channel spam while deliberately scoping out employee surveillance features in V1.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Architected deterministic audit engine powered by append-only PostgreSQL schemas, surfacing discrepancies between spoken commitments and recorded codebase state strictly upon explicit user queries.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=2.0)
    r = p.add_run('• Shipped interactive 8-step clickable MVP on Lovable with live drift queries; authored comprehensive 400-line Notion PRD detailing state transition matrices, query grammar, and phased enterprise rollout.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    # Flagship 2: FinMate AI
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('FinMate AI — Conversational Expense Memory & Deterministic Accounting  |  FinTech Systems  |  2024 – 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(9.2); r.font.bold = True
    p_link2 = add_p(space_before=0, space_after=0.7)
    r = p_link2.add_run('Live Production MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.bold = True
    add_hyperlink(p_link2, 'https://tell-finmate-ai.lovable.app', 'tell-finmate-ai.lovable.app', font_size_pt=8.8, bold=True)
    r = p_link2.add_run('  |  Architecture & PRD: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.8); r.font.bold = True
    add_hyperlink(p_link2, 'https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link', 'Notion PRD', font_size_pt=8.8, bold=True)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Uncovered key user friction in expense tracking where tedious 6-field forms trigger 70% onboarding drop-off, while identifying that pure LLM bots hallucinate arithmetic totals, destroying financial trust.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Engineered two-stage decoupled architecture directing multimodal LLMs (voice notes, OCR receipts, chat) to extract structured JSON intents and entities, while routing 100% of arithmetic calculations to concurrency-safe PostgreSQL stored procedures (RPCs).')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Enforced complete financial auditability through evidence-linked ledger rows, guaranteeing clickable citations for every response and eliminating arithmetic discrepancies.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=2.2)
    r = p.add_run('• Deployed production-ready MVP on Lovable with streaming voice transcription and informal loan tracking; authored complete PRD covering database schemas, Row-Level Security (RLS) policies, and error handling.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    # ==========================
    # 5. PATENTS & RESEARCH
    # ==========================
    add_heading('PATENTS & RESEARCH')
    p = add_p(space_before=1.0, space_after=0.6)
    r = p.add_run('• Filed Patent (South African Patent Office): ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('AI-Powered Lost & Found Matching System — Conceptualized 5-factor blind multimodal scoring architecture (image embeddings, NLP text, geolocation, timestamp) with automated urgency detection | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=2.0)
    r = p.add_run('• Published HCI Research Study: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('AI-Driven Multilingual Adaptive UX Framework & Zero-Risk Financial Sandbox — Designed dual-mode environment pairing live transactions with a simulated practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture affordances | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    # ==========================
    # 6. HONORS & AWARDS
    # ==========================
    add_heading('HONORS & AWARDS')
    p = add_p(space_before=1.0, space_after=0.6)
    r = p.add_run('• Won National Finalist at India Innovates Hackathon: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('Ranked among top finalist teams nationwide out of 6,000+ participating teams across India | 2024')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=2.0)
    r = p.add_run('• Qualified for Round 2 in GHCI 25 National GenAI Hackathon: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run("AnitaB.org India & Backbase | 'Unbound with GenAI: Breaking Barriers, Creating Impact' | 2025")
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    # ==========================
    # 7. SKILLS (Exact Standard)
    # ==========================
    add_heading('SKILLS')
    p = add_p(space_before=1.0, space_after=0.6)
    r = p.add_run('• Product Management: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('Product Discovery, Product Requirements Document (PRD), Jobs-to-be-Done (JTBD), User Journey Mapping, RICE Prioritization, North Star & Guardrail Metrics, Customer Interviews, Experimentation, Go-to-Market (GTM) Strategy, Trade-off Analysis, Figma')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• AI & Systems: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('LLM Prompt Engineering, Retrieval-Augmented Generation (RAG), AI Governance, Vector Embeddings, Multimodal AI (Voice, Vision OCR), PostgreSQL Stored Procedures (RPC), REST APIs, High-Level Design (HLD)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=0.6)
    r = p.add_run('• Technical & Problem-Solving: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('Java, Spring Framework, Python, SQL/PostgreSQL, REST APIs, Git, LangChain, LangGraph, Rapid Prototyping (Lovable.dev)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    p = add_p(space_before=0, space_after=2.0)
    r = p.add_run('• DSA & Competitive Programming: ')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9); r.font.bold = True
    r = p.add_run('610+ Solved Problems — 400+ LeetCode, 210+ GeeksforGeeks (Data Structures, Algorithms, Problem Solving)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    # ==========================
    # 8. CERTIFICATIONS
    # ==========================
    add_heading('CERTIFICATIONS')
    p = add_p(space_before=1.0, space_after=0)
    r = p.add_run('Product Management Masterclass (GeeksforGeeks)  |  AI Agents & Automation (CampusX)  |  Advanced RAG Architecture (CampusX)  |  Prompt Engineering & Docker for ML (CampusX)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.9)

    # Destination paths
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
    annots = reader.pages[0].get('/Annots')
    annot_count = len(annots) if annots else 0

    print(f"ATS Enhanced Build Complete!")
    print(f"Word computed pages: {pages}")
    print(f"PyPDF verified pages: {pdf_pages}")
    print(f"Verified link annotations: {annot_count}")
    print(f"Docx generated: {dest_docx_1} ({os.path.getsize(dest_docx_1)} bytes)")
    print(f"PDF generated: {dest_pdf_1} ({os.path.getsize(dest_pdf_1)} bytes)")

if __name__ == '__main__':
    build_top_tier_resume()
