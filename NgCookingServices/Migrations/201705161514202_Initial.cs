namespace NgCookingServices.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        Title = c.String(),
                        Text = c.String(),
                        Mark = c.Int(nullable: false),
                        Recipe_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cooks", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.Recipes", t => t.Recipe_Id)
                .Index(t => t.UserId)
                .Index(t => t.Recipe_Id);
            
            CreateTable(
                "dbo.Cooks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Firstname = c.String(),
                        Surname = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        Level = c.Int(nullable: false),
                        Picture = c.String(),
                        City = c.String(),
                        Birth = c.Int(nullable: false),
                        Bio = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Ingredients",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        IsAvailable = c.Boolean(nullable: false),
                        Picture = c.String(),
                        CategoryId = c.String(nullable: false, maxLength: 128),
                        Calories = c.Int(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.IngredientsCategories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.IngredientsCategories",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        DisplayName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Recipes",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        CookId = c.Int(nullable: false),
                        CreationDate = c.DateTime(nullable: false),
                        IsAvailable = c.Boolean(nullable: false),
                        CategoryId = c.String(nullable: false, maxLength: 128),
                        Picture = c.String(),
                        Calories = c.Int(nullable: false),
                        Preparation = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RecipesCategories", t => t.CategoryId, cascadeDelete: true)
                .ForeignKey("dbo.Cooks", t => t.CookId, cascadeDelete: true)
                .Index(t => t.CookId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.RecipesCategories",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        DisplayName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RecipesToIngredients",
                c => new
                    {
                        Ingredients_Id = c.String(nullable: false, maxLength: 128),
                        Recipes_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Ingredients_Id, t.Recipes_Id })
                .ForeignKey("dbo.Ingredients", t => t.Ingredients_Id, cascadeDelete: true)
                .ForeignKey("dbo.Recipes", t => t.Recipes_Id, cascadeDelete: true)
                .Index(t => t.Ingredients_Id)
                .Index(t => t.Recipes_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RecipesToIngredients", "Recipes_Id", "dbo.Recipes");
            DropForeignKey("dbo.RecipesToIngredients", "Ingredients_Id", "dbo.Ingredients");
            DropForeignKey("dbo.Recipes", "CookId", "dbo.Cooks");
            DropForeignKey("dbo.Comments", "Recipe_Id", "dbo.Recipes");
            DropForeignKey("dbo.Recipes", "CategoryId", "dbo.RecipesCategories");
            DropForeignKey("dbo.Ingredients", "CategoryId", "dbo.IngredientsCategories");
            DropForeignKey("dbo.Comments", "UserId", "dbo.Cooks");
            DropIndex("dbo.RecipesToIngredients", new[] { "Recipes_Id" });
            DropIndex("dbo.RecipesToIngredients", new[] { "Ingredients_Id" });
            DropIndex("dbo.Recipes", new[] { "CategoryId" });
            DropIndex("dbo.Recipes", new[] { "CookId" });
            DropIndex("dbo.Ingredients", new[] { "CategoryId" });
            DropIndex("dbo.Comments", new[] { "Recipe_Id" });
            DropIndex("dbo.Comments", new[] { "UserId" });
            DropTable("dbo.RecipesToIngredients");
            DropTable("dbo.RecipesCategories");
            DropTable("dbo.Recipes");
            DropTable("dbo.IngredientsCategories");
            DropTable("dbo.Ingredients");
            DropTable("dbo.Cooks");
            DropTable("dbo.Comments");
        }
    }
}
