# Code samples of Solid Design Principles

This repository contains code samples that demonstrate the SOLID design principles in software development. Everything is written in Typescript, but the concepts can be applied to any object-oriented programming language.

All examples included in this repository demonstrate some unfortunate design choices that can be improved by applying the SOLID principles.

## SOLID Principles

1. **Single Responsibility Principle (SRP)**: A class should have only one reason to change, meaning it should have only one job or responsibility.

    - Example: OrderReceipt (./OrderReceipt.ts)
    - Example: GradeReport (./GradeExporter.ts)

2. **Open/Closed Principle (OCP)**: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

    - Example: DiscountCalculator (./DiscountCalculator.ts)
    - Example: PaymentMethods (./PaymentMethods.ts)
    - Example: GradeExporter (./GradeExporter.ts)